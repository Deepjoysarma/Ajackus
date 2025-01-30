import React, { useEffect, useState } from "react";
import axios from "axios";
import UserForm from "./UserForm";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null); 

  
  const fetchUsers = () => {
    axios.get("https://ajackus-backend-00q1.onrender.com/users")
      .then((res) => setUsers(res.data))
      .catch(() => setError("Failed to load users"));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to add a new user to the list
  const addUserToList = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  // Function to update a user in the list
  const updateUserInList = (updatedUser) => {
    setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
  };

  // Delete user function
  const deleteUser = (id) => {
    axios.delete(`https://ajackus-backend-00q1.onrender.com/users/${id}`)
      .then(() => setUsers(users.filter(user => user.id !== id)))
      .catch(() => setError("Failed to delete user"));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Users List</h2>

      <UserForm onSuccess={addUserToList} onUpdate={updateUserInList} editingUser={editingUser} setEditingUser={setEditingUser} />

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-200 mt-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Department</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border">
                <td className="border p-2 text-center">{user.id}</td>
                <td className="border p-2 text-center">{user.name}</td>
                <td className="border p-2 text-center">{user.email}</td>
                <td className="border p-2 text-center">{user.company?.name || "N/A"}</td>
                <td className="border p-2 text-center">
                  <button onClick={() => deleteUser(user.id)} className="bg-red-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-red-600">Delete</button>
                  <button onClick={() => setEditingUser(user)} className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
