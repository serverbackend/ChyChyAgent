import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { FaEdit, FaRegStar, FaStar } from "react-icons/fa";
import { truncateText } from "../../hooks/truncateText";
import { useBlogStore } from "../../stores/useBlogStore";
import { formattedDate } from "../../utils/dateFormatter";

const BlogList = () => {
  const [blog, setBlogs] = useState([]);

  const { getAllBlog, blogs, deleteBlog, toggleFeaturedBlog } = useBlogStore();

  useEffect(() => {
    getAllBlog();
    setBlogs(blogs);
  }, [blogs]);

  return (
    <div className="py-2 px-2 w-full h-screen dark:text-white dark:bg-gray-900">
      <div className="border rounded-lg border-stone-400 w-[320px] lg:w-full h-full overflow-auto scrollbar-thin">
        <div className="w-full">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-950">
                <th className="text-sm border-gray-300 p-2 text-left">Title</th>
                <th className="text-sm border-gray-300 p-2 text-left">
                  Description
                </th>
                <th className="text-sm border-gray-300 p-2 text-left">
                  isFeatured
                </th>
                <th className="text-sm border-gray-300 p-2 text-left">
                  Author
                </th>
                <th className="text-sm border-gray-300 p-2 text-left">
                  Category
                </th>
                <th className="text-sm border-gray-300 p-2 text-left">Date</th>
                <th className="text-sm border-gray-300 p-2 text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {blog.map((blog) => (
                <tr
                  key={blog._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-950"
                >
                  <td className="text-xs border-gray-300 p-2">{blog.title}</td>
                  <td className="text-xs border-gray-300 p-2">
                    {truncateText(blog.description, 40)}
                  </td>

                  <td className="text-xs border-gray-300 px-8">
                    <button onClick={() => toggleFeaturedBlog(blog._id)}>
                      {blog.isFeatured ? (
                        <FaStar size={24} className="text-yellow-400" />
                      ) : (
                        <FaRegStar size={24} className="text-yellow-400" />
                      )}
                    </button>
                  </td>
                  <td className="text-xs border-gray-300 p-2">{blog.author}</td>
                  <td className="text-xs border-gray-300 p-2">
                    {blog.category}
                  </td>
                  <td className="text-xs border-gray-300 p-2">
                    {formattedDate(blog.createdAt)}
                  </td>
                  <td className="text-xs border-gray-300 p-2">
                    <div className="flex gap-2 items-center">
                      <Link to={`/admin/blog-edit/${blog._id}`}>
                        <FaEdit className="text-blue-800" size={18} />
                      </Link>
                      <button onClick={() => deleteBlog(blog._id)}>
                        <MdOutlineDeleteSweep
                          className="text-red-600"
                          size={22}
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BlogList;
