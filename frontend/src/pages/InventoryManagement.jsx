import React, { useState, useEffect } from "react";
import axios from "axios";

const InventoryManagement = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [newItem, setNewItem] = useState({
    category: "Tools/Equipment",
    subcategory: "",
    name: "",
    tag: "",
    quantity: 0,
    remarks: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch inventory data from backend
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
    }
  };

  // Fetch categories from backend
  const fetchCategories = async () => {
    try {
      const categoryResponse = await axios.get(
        "http://localhost:5000/api/categories"
      );
      setCategories(categoryResponse.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch subcategories from backend based on selected category
  const fetchSubcategories = async (categoryId) => {
    try {
      const subcategoryResponse = await axios.get(
        `http://localhost:5000/api/subcategories?categoryId=${categoryId}`
      );
      setSubcategories(subcategoryResponse.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, [selectedCategory, selectedSubcategory, searchTerm]);

  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch subcategories whenever the category changes
  useEffect(() => {
    if (selectedCategory !== "All") {
      fetchSubcategories(selectedCategory);
    } else {
      setSubcategories([]); // Reset subcategories if "All" is selected
    }
  }, [selectedCategory]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddItem = async () => {
    try {
      await axios.post("http://localhost:5000/api/inventory", newItem);
      setIsModalOpen(false);
      setNewItem({
        category: "Tools/Equipment",
        subcategory: "",
        name: "",
        tag: "",
        quantity: 0,
        remarks: "",
      });
      fetchInventory(); // Reload inventory data after adding an item
    } catch (error) {
      console.error("Error adding inventory item:", error);
    }
  };

  const handleEditItem = (itemId) => {
    console.log(`Edit item with ID: ${itemId}`);
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5000/api/inventory/${itemId}`);
      fetchInventory(); // Reload inventory data after deletion
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="min-h-screen p-1">
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
            {/* Category Filter */}
            <select
              className="bg-gray-50 border border-gray-300 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedSubcategory(""); // Reset subcategory when category changes
              }}
            >
              <option value="All">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {/* Subcategory Filter */}
            {selectedCategory !== "All" && subcategories.length > 0 && (
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

          {/* Add Item Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-xs hover:bg-blue-700"
          >
            + Add Item
          </button>
        </div>

        {/* Table Section */}
        <div className="p-6 bg-white max-h-[395px] overflow-y-auto">
          <table className="w-full text-xs text-center text-gray-600 border-collapse border border-gray-200">
            <thead className="sticky top-0 z-10 bg-white">
              <tr>
                <th className="border border-gray-200 px-6 py-3">Category</th>
                <th className="border border-gray-200 px-6 py-3">
                  Subcategory
                </th>
                <th className="border border-gray-200 px-6 py-3">Name</th>
                <th className="border border-gray-200 px-6 py-3">Tag/Code</th>
                <th className="border border-gray-200 px-6 py-3">Quantity</th>
                <th className="border border-gray-200 px-6 py-3">Remarks</th>
                <th className="border border-gray-200 px-6 py-3">Date</th>
                <th className="border border-gray-200 px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventoryData.length > 0 ? (
                inventoryData.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-gray-200 px-6 py-3">
                      {item.category}
                    </td>
                    <td className="border border-gray-200 px-6 py-3">
                      {item.subcategory}
                    </td>
                    <td className="border border-gray-200 px-6 py-3">
                      {item.name}
                    </td>
                    <td className="border border-gray-200 px-6 py-3">
                      {item.tag}
                    </td>
                    <td className="border border-gray-200 px-6 py-3">
                      {item.quantity}
                    </td>
                    <td className="border border-gray-200 px-6 py-3">
                      {item.remarks}
                    </td>
                    <td className="border border-gray-200 px-6 py-3">
                      {item.date}
                    </td>
                    <td className="border border-gray-200 px-6 py-3">
                      <button
                        onClick={() => handleEditItem(item.id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="ml-2 text-red-600 hover:text-red-800"
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

      {/* Modal to Add New Item */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Add New Inventory Item</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={newItem.category}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Subcategory
                </label>
                <select
                  name="subcategory"
                  value={newItem.subcategory}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                >
                  {subcategories.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Other form fields for name, tag, quantity, remarks */}
              <button
                type="button"
                onClick={handleAddItem}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Add Item
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="ml-4 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryManagement;
