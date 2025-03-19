import React, { useState, useEffect } from "react";
import axios from "axios";

const InventoryManagement = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // 🔥 Empty default item
  const defaultNewItem = {
    category: "",
    name: "",
    brand: "",
    specs: "",
    pricing: "",
    durability: "",
    tag: "",
    quantity: "",
    date: "",
    remarks: "",
  };

  const [newItem, setNewItem] = useState(defaultNewItem);

  // ✅ Fetch Inventory Data (No Default Values)
  const fetchInventory = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/inventory");
      setInventoryData(response.data);
    } catch (error) {
      console.error("Error fetching inventory data:", error);
      alert("Failed to fetch inventory data.");
    }
  };

  // ✅ Fetch Categories
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
  }, [selectedCategory]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddItem = () => {
    if (!newItem.category || !newItem.name || !newItem.brand || !newItem.quantity || !newItem.date) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      if (isEditing) {
        // Update existing item
        setInventoryData((prev) =>
          prev.map((item) => (item.id === newItem.id ? newItem : item))
        );
        alert("Item updated successfully!");
      } else {
        // Generate a fake ID for new items
        const newId = Math.floor(Math.random() * 100000);
        const newItemWithId = { ...newItem, id: newId };
        setInventoryData((prev) => [newItemWithId, ...prev]);
        alert("Item added successfully!");
      }

      // Close modal and reset form (🔥 Empty values now!)
      setIsModalOpen(false);
      setIsEditing(false);
      setNewItem(defaultNewItem);
    } catch (error) {
      console.error("Frontend Error:", error.message);
      alert("An error occurred while saving the item.");
    }
  };

  const handleDeleteItem = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setInventoryData((prev) => prev.filter((item) => item.id !== id));
      alert("Item deleted successfully!");
    }
  };

  const handleEditItem = (item) => {
    setNewItem(item);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto shadow-lg rounded-lg overflow-hidden bg-white">
        {/* Top Bar */}
        <div className="sticky top-0 bg-white z-10 border-b px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search items..."
              className="w-72 bg-gray-50 border border-gray-300 text-xs rounded-lg p-2.5"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="bg-gray-50 border border-gray-300 text-xs rounded-lg p-2.5"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => {
              setIsEditing(false);
              setNewItem(defaultNewItem); // 🔥 Reset to empty values
              setIsModalOpen(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-xs hover:bg-blue-700"
          >
            + Add Item
          </button>
        </div>

        {/* Table Section */}
        <div className="p-6 bg-white w-full">
  <div className="max-w-7xl mx-auto shadow-lg rounded-lg overflow-hidden">
    
    {/* 🛠️ Table Wrapper with No Text Cutoff */}
    <div className="overflow-y-auto max-h-[600px] w-full">
      <table className="w-full border-collapse table-fixed text-sm text-left text-gray-600">
        
        {/* 🔥 Sticky Table Headers with Proper Spacing */}
        <thead className="sticky top-0 bg-gray-200 text-gray-700 uppercase text-xs font-semibold z-10">
          <tr>
            {[
              { label: "Category", width: "12%" },
              { label: "Name", width: "15%" },
              { label: "Brand", width: "10%" },
              { label: "Specs", width: "10%" },
              { label: "Pricing", width: "10%" },
              { label: "Durability", width: "10%" },
              { label: "Tag", width: "10%" },
              { label: "Quantity", width: "7%" },
              { label: "Date", width: "8%" },
              { label: "Remarks", width: "20%" },
              { label: "Actions", width: "10%" }
            ].map((col) => (
              <th 
                key={col.label} 
                className="border border-gray-300 px-4 py-3 text-center bg-gray-200"
                style={{ minWidth: "150px", wordBreak: "break-word" }} // Allows full text display
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        {/* 🛠️ Scrollable Table Body (No Text Cutoff) */}
        <tbody>
          {inventoryData.length > 0 ? (
            inventoryData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-3 text-center">{item.category}</td>
                <td className="border border-gray-300 px-4 py-3 text-center break-words">{item.name}</td>
                <td className="border border-gray-300 px-4 py-3 text-center">{item.brand || "--"}</td>
                <td className="border border-gray-300 px-4 py-3 text-center">{item.specs || "--"}</td>
                <td className="border border-gray-300 px-4 py-3 text-center">{item.pricing || "--"}</td>
                <td className="border border-gray-300 px-4 py-3 text-center">{item.durability || "--"}</td>
                <td className="border border-gray-300 px-4 py-3 text-center break-words">{item.tag}</td>
                <td className="border border-gray-300 px-4 py-3 text-center">{item.quantity}</td>
                <td className="border border-gray-300 px-4 py-3 text-center">{new Date(item.date).toLocaleDateString()}</td>
                <td className="border border-gray-300 px-4 py-3 text-center break-words">{item.remarks}</td>
                <td className="border border-gray-300 px-4 py-3 text-center">
                  <div className="flex justify-center items-center space-x-1">
                    <button 
                      onClick={() => handleEditItem(item)}
                      className="bg-green-500 text-white px-2 py-1 text-xs rounded-md hover:bg-green-600"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteItem(item.id)} 
                      className="bg-red-500 text-white px-2 py-1 text-xs rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11" className="border border-gray-300 px-4 py-3 text-center text-gray-500">
                No items found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

  </div>
</div>

      </div>

      {isModalOpen && (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
      <h2 className="text-lg font-bold mb-4">{isEditing ? "Edit Inventory Item" : "Add New Inventory Item"}</h2>
      <form>
        {Object.keys(defaultNewItem).map((key) => (
          <div key={key} className="mb-2">
            <label className="block text-sm font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
            
            {/* Use Date Picker for the 'date' field */}
            {key === "date" ? (
              <input
                type="date"
                name={key}
                value={newItem[key]}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            ) : (
              <input
                name={key}
                value={newItem[key]}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            )}
          </div>
        ))}

        {/* Buttons: "Cancel" & "Save Changes" on the Right */}
        <div className="flex justify-end space-x-4 mt-4">
          <button 
            type="button" 
            onClick={() => setIsModalOpen(false)}
            className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
          >
            Cancel
          </button>

          <button 
            type="button" 
            onClick={handleAddItem} 
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            {isEditing ? "Save Changes" : "Add Item"}
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