// src/pages/UsersForm.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createUser, getUserById, updateUser } from "../../services/userService";

export default function UsersForm() {
  const { id } = useParams(); // if present → editing mode
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "collector", // default role
    password: "", // only required on create
  });

  const [loading, setLoading] = useState(false);

  // Load user data if editing
  useEffect(() => {
    if (isEditing) {
      getUserById(id).then((data) => {
        setFormData({
          username: data.username || "",
          email: data.email || "",
          role: data.role || "collector",
          password: "", // keep empty (don’t expose password)
        });
      });
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditing) {
        await updateUser(id, {
          username: formData.username,
          email: formData.email,
          role: formData.role,
          // don’t send password unless changing it
          ...(formData.password ? { password: formData.password } : {}),
        });
      } else {
        await createUser(formData);
      }
      navigate("/users");
    } catch (err) {
      console.error("Failed to save user:", err);
      alert("Error saving user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">
        {isEditing ? "Edit User" : "Add New User"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border p-2 rounded"
          required={!isEditing}
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option disabled={formData.role} value="">{formData.role}</option>
          <option value="collector">Collector</option>
          <option value="technician">Technician</option>
          <option value="admin">Admin</option>
          {/* <option value="patient">Patient</option> */}
        </select>

        {/* Password field only required for create */}
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder={isEditing ? "Change Password (optional)" : "Password"}
          className="w-full border p-2 rounded"
          required={!isEditing} 
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Saving..." : isEditing ? "Update User" : "Create User"}
        </button>
      </form>
    </div>
  );
}
