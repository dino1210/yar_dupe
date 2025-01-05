import React, { useState } from "react";

const UserManagement = () => {
  const [userData, setUserData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    role: "",
    status: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = () => {
    if (!newUser.username || !newUser.email || !newUser.role || !newUser.status) {
      alert("Please complete all fields before adding a user.");
      return;
    }

    const newUserWithId = {
      ...newUser,
      id: Date.now(), // Generate a temporary unique ID
    };

    setUserData((prev) => [...prev, newUserWithId]); // Add the new user to the table
    alert("User added successfully!");
    handleCancel(); // Reset and close the modal
  };

  const handleEditUser = (user) => {
    setIsEditing(true);
    setEditingUserId(user.id);
    setNewUser({
      username: user.username,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setIsModalOpen(true);
  };

  const handleUpdateUser = () => {
    if (!newUser.username || !newUser.email || !newUser.role || !newUser.status) {
      alert("Please complete all fields before updating the user.");
      return;
    }

    setUserData((prev) =>
      prev.map((user) =>
        user.id === editingUserId ? { ...user, ...newUser } : user
      )
    );
    alert("User updated successfully!");
    handleCancel(); // Reset and close the modal
  };

  const handleDeleteUser = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      setUserData((prev) => prev.filter((user) => user.id !== id));
      alert("User deleted successfully!");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setEditingUserId(null);
    setNewUser({
      username: "",
      email: "",
      role: "",
      status: "",
    });
  };

  return (
    <div className="min-h-screen p-1 bg-gray-100">
      <div className="max-w-7xl mx-auto shadow-lg rounded-lg overflow-hidden bg-white">
        {/* Top Bar */}
        <div className="sticky top-0 bg-white z-10 border-b px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search users..."
              className="w-72 bg-gray-50 border border-gray-300 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Add Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-xs hover:bg-blue-700"
          >
            + Add User
          </button>
        </div>

        {/* Table Section */}
        <div className="p-6 bg-white max-h-[400px] overflow-y-auto">
          <table className="w-full text-xs text-center text-gray-600 border-collapse border border-gray-200">
            <thead className="sticky top-0 z-10 bg-white">
              <tr>
                <th className="border border-gray-200 px-6 py-3">Username</th>
                <th className="border border-gray-200 px-6 py-3">Email</th>
                <th className="border border-gray-200 px-6 py-3">Role</th>
                <th className="border border-gray-200 px-6 py-3">Status</th>
                <th className="border border-gray-200 px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userData.length > 0 ? (
                userData
                  .filter((user) =>
                    user.username.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((user) => (
                    <tr key={user.id}>
                      <td className="border border-gray-200 px-6 py-3">{user.username}</td>
                      <td className="border border-gray-200 px-6 py-3">{user.email}</td>
                      <td className="border border-gray-200 px-6 py-3">{user.role}</td>
                      <td className="border border-gray-200 px-6 py-3">{user.status}</td>
                      <td className="border border-gray-200 px-6 py-3 space-x-2">
                        <button
                          className="bg-green-600 text-white px-2 py-1 rounded-md text-xs hover:bg-green-700"
                          onClick={() => handleEditUser(user)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-600 text-white px-2 py-1 rounded-md text-xs hover:bg-red-700"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="border border-gray-200 px-6 py-3 text-center"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Add/Edit User Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-lg font-bold mb-4 text-center">
                {isEditing ? "Edit User" : "Add New User"}
              </h2>
              <form>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={newUser.username}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={newUser.email}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Role</label>
                  <select
                    name="role"
                    value={newUser.role}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-2"
                  >
                    <option value="">Select Role</option>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select
                    name="status"
                    value={newUser.status}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-2"
                  >
                    <option value="">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={isEditing ? handleUpdateUser : handleAddUser}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    {isEditing ? "Update User" : "Add User"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
