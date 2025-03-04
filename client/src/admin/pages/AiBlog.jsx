import React, { useState } from "react";
import axios from "axios";
import { FaRegCopy } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import removeMarkdown from "remove-markdown";
import { prompts } from "../utils/data";
const AiBlog = () => {
  const [prompt, setPrompt] = useState("");
  const [submittedPrompt, setSubmittedPrompt] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [blogIdeas, setBlogIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingIdeas, setLoadingIdeas] = useState(false);
  const [error, setError] = useState("");

  const removeMarkdown = (text) => {
    return text
      .replace(/(\*\*|__)(.*?)\1/g, "$2") // Bold (**text** or __text__)
      .replace(/(\*|_)(.*?)\1/g, "$2") // Italic (*text* or _text_)
      .replace(/~~(.*?)~~/g, "$1") // Strikethrough
      .replace(/`(.*?)`/g, "$1") // Inline code
      .replace(/#+\s?/g, "") // Headers (#, ##, ###)
      .replace(/>\s?/g, "") // Blockquotes (>)
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Links [text](url)
      .replace(/!\[.*?\]\(.*?\)/g, "") // Images
      .replace(/[-*]\s+/g, "") // Lists (-, *, •)
      .replace(/\n{2,}/g, "\n") // Remove extra newlines
      .trim();
  };

  // Function to Generate Blog Content
  const generateBlogContent = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError("");
    setGeneratedContent(""); // Clear previous content

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/Aiblog/generate",
        { prompt }
      );

      console.log("API Response:", response.data); // Debugging Step

      // Try different possible structures based on response data
      let content = "";

      if (response.data?.content) {
        content = response.data.content; // If content is directly available
      } else if (response.data?.text) {
        content = response.data.text; // If content is inside "text"
      } else if (Array.isArray(response.data) && response.data.length > 0) {
        content = response.data[0]; // If API returns an array
      } else {
        content = "No content generated. Please try again.";
      }

      setSubmittedPrompt(prompt);
      setGeneratedContent(content);
    } catch (error) {
      console.error("Error generating content:", error);
      setError("Failed to generate blog content. Please try again.");
    }

    setLoading(false);
  };

  // Function to Get Blog Ideas
  const generateBlogIdeas = async () => {
    setLoadingIdeas(true);
    setError("");

    // Pick a random prompt from the list
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/Aiblog/ideas",
        { prompt: randomPrompt } // Use a random prompt each time
      );
      setBlogIdeas(response.data.ideas || []);
    } catch (error) {
      console.error("Error fetching blog ideas:", error);
      setError("Failed to fetch blog ideas.");
    }

    setLoadingIdeas(false);
  };

  // Function to Copy Text to Clipboard
  const handleCopy = (text) => {
    const plainText = removeMarkdown(text);
    navigator.clipboard
      .writeText(plainText)
      .then(() => {
        alert("Content copied successfully!");
      })
      .catch((err) => console.error("Failed to copy:", err));
  };

  return (
    <div className="w-full h-full min-h-dvh dark:text-white dark:bg-gray-900">
      <div className="max-w-3xl lg:mx-auto p-3 lg:p-6 ">
        {/* Error Message */}
        {error && <p className="text-red-600 mb-4">{error}</p>}

        {/* Blog Ideas Button */}
        <button
          onClick={generateBlogIdeas}
          className="bg-green-600 text-white p-2 lg:px-5 lg:py-2 rounded-md mb-4 hover:bg-green-700 transition"
        >
          {loadingIdeas ? "Fetching Ideas..." : "Get Blog Ideas"}
        </button>

        {/* Display Blog Ideas */}
        {blogIdeas.length > 0 && (
          <ul className="mb-4">
            {blogIdeas.map((idea, index) => (
              <li key={index} className="bg-gray-100 p-2 rounded-md mb-2 prose">
                <ReactMarkdown>{idea.trim()}</ReactMarkdown>
              </li>
            ))}
          </ul>
        )}

        {/* Prompt Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter a blog topic..."
            className="flex-grow p-3 border rounded-md dark:text-white dark:bg-gray-700"
          />
          <button
            onClick={generateBlogContent}
            className="bg-blue-600 text-white p-2 lg:px-5 lg:py-3 rounded-md hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>

        {/* AI Generated Content (Rendered as Markdown) */}
        {generatedContent && (
          <div className="mt-6 p-4 border rounded-md bg-white shadow">
            <h3 className="text-lg font-semibold mb-2">AI Blog Content</h3>
            <div className="prose">
              <ReactMarkdown>{generatedContent}</ReactMarkdown>
            </div>
            <button
              onClick={() => handleCopy(generatedContent)}
              className="mt-4 text-gray-600 hover:text-black flex items-center"
            >
              <FaRegCopy size={18} className="mr-2" /> Copy Content
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiBlog;
