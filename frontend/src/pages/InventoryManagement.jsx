import React, { useState, useEffect } from "react";
import axios from "axios";

const InventoryManagement = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([
    { id: "1", name: "Welding Machine" },
    { id: "2", name: "Angle Grinder" },
  ]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [newItem, setNewItem] = useState({
    category: "",
    subcategory: "",
    name: "",
    tag: "",
    quantity: "",
    date: "",
    remarks: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch inventory data
  const fetchInventory = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/inventory", {
        params: {
          category: selectedCategory,
          subcategory: selectedSubcategory,
          searchTerm,
        },
      });
      setInventoryData(response.data);
    } catch (error) {
      console.error("Error fetching inventory data:", error);
      alert("Failed to fetch inventory data.");
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      alert("Failed to fetch categories.");
    }
  };

  useEffect(() => {
    fetchInventory();
  }, [selectedCategory, selectedSubcategory, searchTerm]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddItem = async () => {
    console.log("New Item Data Sent to Backend:", newItem);

    if (
      !newItem.category ||
      !newItem.subcategory ||
      !newItem.name ||
      !newItem.tag ||
      !newItem.quantity ||
      !newItem.date
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      if (isEditing) {
        const response = await axios.put(
          `http://localhost:5000/api/inventory/${newItem.id}`,
          newItem
        );
        console.log("API Response:", response);
        if (response.status === 200) {
          alert("Item updated successfully!");
        }
      } else {
        const response = await axios.post(
          "http://localhost:5000/api/inventory",
          newItem
        );
        console.log("API Response:", response);
        if (response.status === 201) {
          alert("Item added successfully!");
        }
      }

      setIsModalOpen(false);
      setIsEditing(false);
      setNewItem({
        category: "",
        subcategory: "",
        name: "",
        tag: "",
        quantity: "",
        date: "",
        remarks: "",
      });
      fetchInventory();
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      alert("An error occurred while saving the item. Saving locally...");

      // Simulate saving locally
      const fallbackNewItem = {
        ...newItem,
        id: inventoryData.length + 1,
      };
      setInventoryData((prev) => [...prev, fallbackNewItem]);

      setIsModalOpen(false);
      setNewItem({
        category: "",
        subcategory: "",
        name: "",
        tag: "",
        quantity: "",
        date: "",
        remarks: "",
      });
    }
  };

  const handleEditItem = (itemId) => {
    const itemToEdit = inventoryData.find((item) => item.id === itemId);
    if (itemToEdit) {
      setNewItem(itemToEdit);
      setIsEditing(true);
      setIsModalOpen(true);
    } else {
      alert("Item not found!");
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/inventory/${itemId}`
      );
      console.log("API Response:", response);
      fetchInventory();
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item.");
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto shadow-lg rounded-lg overflow-hidden">
        {/* Top Bar */}
        <div className="sticky top-0 bg-white z-10 border-b px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search items..."
              className="w-72 bg-gray-50 border border-gray-300 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="bg-gray-50 border border-gray-300 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedSubcategory("");
              }}
            >
              <option value="All">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {selectedCategory !== "All" && (
              <select
                className="bg-gray-50 border border-gray-300 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
              >
                <option value="">All Subcategories</option>
                {subcategories.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          <button
            onClick={() => {
              setIsEditing(false);
              setNewItem({
                category: "",
                subcategory: "",
                name: "",
                tag: "",
                quantity: "",
                date: "",
                remarks: "",
              });
              setIsModalOpen(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-xs hover:bg-blue-700"
          >
            + Add Item
          </button>
        </div>

        {/* Table Section */}
        <div className="p-6 bg-white max-h-[395px] overflow-auto">
          <table className="w-full text-xs text-center text-gray-600 border-collapse border border-gray-200">
            <thead className="sticky top-0 bg-white z-10">
              <tr>
                <th className="border border-gray-200 px-6 py-3 w-24">Category</th>
                <th className="border border-gray-200 px-6 py-3 w-24">Subcategory</th>
                <th className="border border-gray-200 px-6 py-3 w-32">Name</th>
                <th className="border border-gray-200 px-6 py-3 w-32">Tag/Code</th>
                <th className="border border-gray-200 px-6 py-3 w-20">Quantity</th>
                <th className="border border-gray-200 px-6 py-3 w-28">Date</th>
                <th className="border border-gray-200 px-6 py-3 w-40">Remarks</th>
                <th className="border border-gray-200 px-6 py-3 w-20">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventoryData.length > 0 ? (
                inventoryData.map((item) => (
                  <tr key={item.id}>
                    <td className="border border-gray-200 px-6 py-3">{item.category}</td>
                    <td className="border border-gray-200 px-6 py-3">{item.subcategory}</td>
                    <td className="border border-gray-200 px-6 py-3">{item.name}</td>
                    <td className="border border-gray-200 px-6 py-3">{item.tag}</td>
                    <td className="border border-gray-200 px-6 py-3">{item.quantity}</td>
                    <td className="border border-gray-200 px-6 py-3">{item.date}</td>
                    <td className="border border-gray-200 px-6 py-3">{item.remarks}</td>
                    <td className="border border-gray-200 px-6 py-3 flex justify-center space-x-2">
                      <button
                        onClick={() => handleEditItem(item.id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="border border-gray-200 px-6 py-3 text-center"
                  >
                    No items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Section */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-lg font-bold mb-4">
              {isEditing ? "Edit Inventory Item" : "Add New Inventory Item"}
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  name="category"
                  value={newItem.category}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Subcategory</label>
                <select
                  name="subcategory"
                  value={newItem.subcategory}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                >
                  <option value="">Select Subcategory</option>
                  {subcategories.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newItem.name}
                  onChange={handleInputChange}
                  placeholder="Enter item name"
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Tag/Code</label>
                <input
                  type="text"
                  name="tag"
                  value={newItem.tag}
                  onChange={handleInputChange}
                  placeholder="Enter tag/code"
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={newItem.quantity}
                  onChange={handleInputChange}
                  placeholder="Enter quantity"
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  value={newItem.date}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Remarks</label>
                <textarea
                  name="remarks"
                  value={newItem.remarks}
                  onChange={handleInputChange}
                  placeholder="Enter any remarks"
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  {isEditing ? "Save Changes" : "Add Item"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setIsEditing(false);
                    setNewItem({
                      category: "",
                      subcategory: "",
                      name: "",
                      tag: "",
                      quantity: "",
                      date: "",
                      remarks: "",
                    });
                  }}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryManagement;
