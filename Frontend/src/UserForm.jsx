import React, { useState, useEffect } from "react";
import axios from "axios";

const UserForm = ({ onSuccess, onUpdate, editingUser, setEditingUser }) => {
  const [user, setUser] = useState({ name: "", email: "", company: { name: "" } });

  
  useEffect(() => {
    if (editingUser) {
      setUser(editingUser);
    } else {
      setUser({ name: "", email: "", company: { name: "" } });
    }
  }, [editingUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
      company: name === "company" ? { name: value } : prevUser.company,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (editingUser) {
        response = await axios.put(`https://ajackus-backend-00q1.onrender.com/users/${editingUser.id}`, user);
        onUpdate(response.data);
      } else {
        response = await axios.post("https://ajackus-backend-00q1.onrender.com/users", user);
        onSuccess(response.data);
      }

      setUser({ name: "", email: "", company: { name: "" } });
      setEditingUser(null);
    } catch (error) {
      console.error("Error saving user:", error);
      alert("Error saving user.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow-lg rounded-lg mb-6">
      <h2 className="text-xl font-semibold text-center mb-4">
        {editingUser ? "Edit User" : "Add User"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={user.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={user.company.name}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            {editingUser ? "Update User" : "Add User"}
          </button>
          {editingUser && (
            <button
              type="button"
              onClick={() => setEditingUser(null)}
              className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserForm;
