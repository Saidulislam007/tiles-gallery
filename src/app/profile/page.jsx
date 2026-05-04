"use client";
import { useUser } from "../context/UserContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Pencil } from "lucide-react";

export default function ProfilePage() {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [name, setName] = useState(user?.name || "");
  const [photo, setPhoto] = useState(user?.photo || "");

  // ✅ Redirect if user not logged in
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null; // prevent rendering

  const handleUpdate = () => {
    setUser({ ...user, name, photo });
    toast.success("Profile Updated Successfully!");
  };
  const [editField, setEditField] = useState(null);
  const [tempValue, setTempValue] = useState("");

  const handleEditClick = (field, currentValue) => {
    setEditField(field);
    setTempValue(currentValue || "");
  };

  const handleSave = () => {
    if (editField === "name") setName(tempValue);
    if (editField === "photo") setPhoto(tempValue);
    // email/password handle backend
    setEditField(null);
    handleUpdate();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200 flex items-center justify-center px-4">
      <Toaster position="top-right" />

      <div className="w-full max-w-lg bg-white shadow-xl rounded-3xl p-8">
        {/* Profile Image */}
        <div className="flex justify-center mb-6 relative">
          <div className="relative">
            <img
              src={photo}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />

            {/* Edit Icon on Image */}
            <button
              onClick={() => handleEditClick("photo", photo)}
              className="absolute top-2 right-2 bg-white p-2 text-black rounded-full shadow hover:bg-gray-100"
            >
              <Pencil size={16} />
            </button>
          </div>
        </div>

        {/* Name */}
        <div className="flex items-center justify-between border-b py-3">
          <div>
            <p className="text-gray-500 text-sm">Name</p>
            <p className="font-medium text-gray-800">{name}</p>
          </div>
          <button onClick={() => handleEditClick("name", name)}>
            <Pencil size={18} className="text-gray-500 hover:text-blue-500" />
          </button>
        </div>

        {/* Email */}
        <div className="flex items-center justify-between border-b py-3">
          <div>
            <p className="text-gray-500 text-sm">Email</p>
            <p className="font-medium text-gray-800">{user?.email}</p>
          </div>
          <button onClick={() => handleEditClick("email", user?.email)}>
            <Pencil size={18} className="text-gray-500 hover:text-blue-500" />
          </button>
        </div>

        {/* Password */}
        <div className="flex items-center justify-between py-3">
          <div>
            <p className="text-gray-500 text-sm">Password</p>
            <p className="font-medium text-gray-800">••••••••</p>
          </div>
          <button onClick={() => handleEditClick("password", "") }>
            <Pencil size={18} className="text-gray-500 hover:text-blue-500" />
          </button>
        </div>

        {/* Edit Modal */}
        {editField && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white p-6 rounded-2xl w-80 space-y-4 shadow-lg">
              <h3 className="text-lg text-black font-semibold capitalize">Edit {editField}</h3>

              <input
                type={editField === "password" ? "password" : "text"}
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                className="w-full px-4 py-2 border text-black rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder={`Enter new ${editField}`}
              />

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setEditField(null)}
                  className="px-4 py-2 text-black bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}