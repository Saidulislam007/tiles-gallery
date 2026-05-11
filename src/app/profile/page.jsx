"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Pencil } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");

  const [editField, setEditField] = useState(null);
  const [tempValue, setTempValue] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhoto(user.image || "");
    }
  }, [user]);

  useEffect(() => {
    if (!isPending && !user) {
      router.push("/login");
    }
  }, [user, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  if (!user) return null;

  const handleUpdate = () => {
    toast.success("Profile Updated Successfully!");
  };

  const handleEditClick = (field, currentValue) => {
    setEditField(field);
    setTempValue(currentValue || "");
  };

  const handleSave = () => {
    if (editField === "name") setName(tempValue);
    if (editField === "photo") setPhoto(tempValue);

    setEditField(null);
    handleUpdate();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Toaster position="top-right" />

      {/* Card */}
      <div className="w-full max-w-xl bg-white border border-gray-200 shadow-xl rounded-3xl p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <img
                src={photo || "/default-user.png"}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
              />
              <button
                onClick={() => handleEditClick("photo", photo)}
                className="absolute bottom-2 right-2 bg-white border border-gray-200 p-2 rounded-full shadow hover:bg-gray-100 transition"
              >
                <Pencil className="text-gray-950" size={14} />
              </button>
            </div>
          </div>

          <h1 className="text-xl font-semibold text-gray-900">
            {name || "User Profile"}
          </h1>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>

        {/* Info List */}
        <div className="space-y-4">

          {/* Name */}
          <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:shadow-sm transition">
            <div>
              <p className="text-xs text-gray-400">Name</p>
              <p className="text-gray-900 font-medium">{name}</p>
            </div>
            <button onClick={() => handleEditClick("name", name)}>
              <Pencil size={18} className="text-gray-400 hover:text-gray-700" />
            </button>
          </div>

          {/* Email */}
          <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:shadow-sm transition">
            <div>
              <p className="text-xs text-gray-400">Email</p>
              <p className="text-gray-900 font-medium">{user.email}</p>
            </div>
            <button onClick={() => handleEditClick("email", user.email)}>
              <Pencil size={18} className="text-gray-400 hover:text-gray-700" />
            </button>
          </div>

          {/* Password */}
          <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:shadow-sm transition">
            <div>
              <p className="text-xs text-gray-400">Password</p>
              <p className="text-gray-900 font-medium">••••••••</p>
            </div>
            <button onClick={() => handleEditClick("password", "")}>
              <Pencil size={18} className="text-gray-400 hover:text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {editField && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-80 rounded-2xl shadow-2xl p-6 space-y-4">

            <h3 className="text-lg font-semibold text-gray-900 capitalize">
              Edit {editField}
            </h3>

            <input
              type={editField === "password" ? "password" : "text"}
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-200 outline-none"
              placeholder={`Enter new ${editField}`}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditField(null)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}