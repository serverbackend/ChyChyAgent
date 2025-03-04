// import React, { useState, useEffect } from "react";
// import axios from "axios";

const AdminProfile = () => {
  // const [admin, setAdmin] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState("");
  // const adminId = "ADMIN_ID_HERE"; // Replace with actual admin ID

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const { data } = await axios.get(
  //         `http://localhost:5000/api/v1/admin/profile/${adminId}`
  //       );
  //       setAdmin(data);
  //     } catch (err) {
  //       setError("Failed to fetch admin profile");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProfile();
  // }, []);

  // const handleImageUpload = async (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   const formData = new FormData();
  //   formData.append("image", file);

  //   try {
  //     const { data } = await axios.put(
  //       `http://localhost:5000/api/v1/admin/profile/${adminId}/image`,
  //       formData,
  //       { headers: { "Content-Type": "multipart/form-data" } }
  //     );

  //     setAdmin((prev) => ({ ...prev, image: data.image }));
  //   } catch (err) {
  //     setError("Failed to upload image");
  //   }
  // };

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className=" w-full h-svh lg:mx-0 mx-auto p-6 bg-white ">
      <h2 className="text-xl font-bold text-gray-700">Admin Profile</h2>

      {/* Profile Image */}
      <div className="relative w-32 h-32 mx-auto my-4">
        <label htmlFor="profileImage">
          <img
            // src={`http://localhost:5000${admin.image}`}
            src="https://images.pexels.com/photos/27992044/pexels-photo-27992044/free-photo-of-young-woman-in-blue-white-blazer-with-pink-glasses.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Profile"
            className="w-full h-full object-cover rounded-full cursor-pointer border border-gray-300"
          />
        </label>
        <input
          type="file"
          id="profileImage"
          accept="image/*"
          className="hidden"
          // onChange={handleImageUpload}
        />
      </div>

      {/* Profile Info */}
      <div className="lg:text-start text-center">
        <p className="text-gray-700 text-lg font-semibold">Admin</p>
        <p className="text-gray-600">admin@gmail.com</p>
        <p className="text-gray-500">Role:Admin</p>
        <p className="text-gray-700 font-semibold mt-2">Blog Posts: 90</p>
      </div>
    </div>
  );
};

export default AdminProfile;
