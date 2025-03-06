import { useCallback, useState } from "react";
import { MdDriveFolderUpload } from "react-icons/md";
import { LiaTimesSolid } from "react-icons/lia";
import coverImg from "../../assets/cover-img.png";
import { generateSlug } from "../hooks/generateSlug";
import Editor from "../components/Editor";
import { useBlogStore } from "../../stores/useBlogStore";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState("real-estate");

  const handleContentChange = useCallback((newContent) => {
    console.log("Updated Content:", newContent); // Debugging log
    setContent(newContent);
  }, []);

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setSlug(generateSlug(newTitle));
  };

  // Handle image upload with preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage({
        preview: URL.createObjectURL(file),
        name: file.name,
      });
    }
  };
  // Reset preview image
  const handleResetPreview = () => {
    setImage(null);
  };

  // Handle tags
  const handleTagInput = (e) => {
    if (e.key === "Enter" && e.target.value) {
      e.preventDefault(); // Prevent form submission
      setTags([...tags, e.target.value.trim()]);
      e.target.value = "";
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const { createBlog } = useBlogStore();
  const handleSubmit = (e) => {
    e.preventDefault();

    const blogData = {
      title,
      slug,
      description,
      content,
      image: image ? image.name : null,
      tags,
      category,
    };

    createBlog(blogData);
    console.log(blogData); // Replace with API call

    // Reset form fields
    setTitle("");
    setSlug("");
    setDescription("");
    setContent("");
    setImage(null);
    setTags([]);
    setCategory("real-estate");
  };

  return (
    <form className="w-full h-full" onSubmit={handleSubmit}>
      <div className="w-full p-4 bg-white dark:bg-gray-900 dark:text-white">
        <h2 className="text-xl font-bold mb-4">Create Blog Post</h2>

        <label className="block mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          className="w-full p-2 text-black dark:bg-gray-600 outline-none border rounded"
        />

        <label className="block mt-4 mb-2">Slug</label>
        <input
          type="text"
          value={slug}
          readOnly
          className="w-full p-2 border rounded text-black outline-none bg-gray-100 dark:bg-gray-500"
        />

        <label className="block mt-4 mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 text-black dark:bg-gray-600 outline-none border rounded"
        />

        <label className="block mt-4 mb-2">Content</label>
        <Editor
          value={content}
          onChange={handleContentChange}
          className="mb-4"
        />

        <label className="block mt-4 mb-2">Cover Photo</label>
        <div
          className="border-2 border-dotted p-6 text-center cursor-pointer"
          onClick={() => document.getElementById("fileInput").click()}
        >
          {image ? (
            <div className="flex flex-col items-center ">
              <div className="relative">
                <img
                  src={image.preview}
                  alt={image.name}
                  className="lg:w-full lg:h-44 w-full h-36 object-cover rounded-md"
                />
                <LiaTimesSolid
                  size={20}
                  className="absolute bg-red-700 rounded-xl p-1 -right-2 -top-2"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent click from triggering file input
                    handleResetPreview();
                  }}
                />
              </div>

              <p className="text-green-600 mt-2">{image.name}</p>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <img src={coverImg} className="w-[10%]" alt="" />
              <div className="flex gap-1 items-center">
                <MdDriveFolderUpload size={25} />
                Upload a file or drag and drop
              </div>
              <p className="text-gray-500 text-xs">PNG, JPG, JPEG up to 10MB</p>
            </div>
          )}
        </div>
        <input
          type="file"
          id="fileInput"
          className="hidden"
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleImageUpload}
        />

        <label className="block mt-4 mb-2">Tags</label>
        <input
          type="text"
          onKeyDown={handleTagInput}
          placeholder="Press Enter to add tag"
          className="w-full p-2 text-black dark:bg-gray-600 outline-none border rounded"
        />
        <div className="flex flex-wrap mt-2">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="bg-blue-500 text-white flex items-center px-2 py-1 rounded m-1"
            >
              {tag}{" "}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-1"
              >
                <LiaTimesSolid />
              </button>
            </div>
          ))}
        </div>

        <label className="block mt-4 mb-2">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 text-black dark:bg-gray-600 outline-none border rounded"
        >
          <option value="real-estate">Real Estate</option>
          <option value="insurance">Insurance</option>
          <option value="financial-education">Financial Education</option>
          <option value="life">Life</option>
        </select>

        <button
          type="submit"
          className="mt-6 w-[100px] bg-blue-600 text-white py-2 rounded"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default CreateBlog;
