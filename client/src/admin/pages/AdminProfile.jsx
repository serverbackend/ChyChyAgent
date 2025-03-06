import { useState, useEffect } from "react";
import { useUserStore } from "../../stores/useUserStore";

const AdminProfile = () => {
  const { user, uploadProfileImage } = useUserStore();
  const [admin, setAdmin] = useState(user || {});
  const [preview, setPreview] = useState(admin.image);

  useEffect(() => {
    if (user) {
      setAdmin(user);
      setPreview(user.image);
    }
  }, [user]);

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl); // Show preview before uploading
      uploadProfileImage(file); // Upload image to Cloudinary
    }
  };

  return (
    <div className="w-full min-h-full flex flex-col items-center justify-center p-6">
      <div className="border border-stone-400 rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Admin Profile
        </h2>

        {/* Profile Image */}
        <div className="relative w-32 h-32 mx-auto my-4">
          <label htmlFor="profileImage" className="cursor-pointer">
            <img
              src={
                preview ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  admin.name
                )}&background=random`
              }
              alt="Profile Admin Image"
              className="w-full h-full object-cover rounded-full border-4 border-gray-300 shadow-sm"
            />
          </label>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        {/* Profile Info */}
        <div className="text-center">
          <p className="text-gray-800 text-xl font-semibold capitalize">
            {admin.name || "Admin"}
          </p>
          <p className="text-gray-600">{admin.email || "admin@example.com"}</p>
          <p className="text-gray-500 capitalize">{admin.role || "Role"}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
