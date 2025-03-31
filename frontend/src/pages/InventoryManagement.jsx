// Updated Inventory Management with working search filter
import React, { useState, useEffect } from "react";
import axios from "axios";

const InventoryManagement = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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
    image: "",
    accountableTo: "",
    consumable: "No",
  };

  const [newItem, setNewItem] = useState(defaultNewItem);

  const fetchInventory = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/inventory");
      let data = response.data;
      if (selectedCategory !== "All") {
        data = data.filter(item => item.category === selectedCategory);
      }
      setInventoryData(data);
    } catch (error) {
      console.error("Error fetching inventory data:", error);
      alert("Failed to fetch inventory data.");
    }
  };

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
        setInventoryData((prev) =>
          prev.map((item) => (item.id === newItem.id ? newItem : item))
        );
        alert("Item updated successfully!");
      } else {
        const newId = inventoryData.length > 0
          ? Math.max(...inventoryData.map(item => item.id || 0)) + 1
          : 1;
        const newItemWithId = { ...newItem, id: newId };
        setInventoryData((prev) => [...prev, newItemWithId]);
        alert("Item added successfully!");
      }

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

  const filteredInventory = inventoryData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full p-4 overflow-auto">
      <div className="w-full max-w-[1700px] mx-auto shadow-lg rounded-lg overflow-auto bg-white">
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
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => {
              setIsEditing(false);
              setNewItem(defaultNewItem);
              setIsModalOpen(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-xs hover:bg-blue-700"
          >
            + Add Item
          </button>
        </div>

        <div className="p-6 bg-white w-full overflow-auto">
          <div className="overflow-auto max-h-[600px]">
            <div className="min-w-[1500px]">
              <table className="min-w-full border-collapse table-fixed text-sm text-left text-gray-600">
                <thead className="sticky top-0 bg-gray-200 text-gray-700 uppercase text-xs font-semibold z-10">
                  <tr>
                    {["ID", "Image", "Category", "Name", "Brand", "Specs", "Pricing", "Durability", "Tag", "Quantity", "Date", "Remarks", "Accountable To", "Consumable", "Actions"].map((col) => (
                      <th
                        key={col}
                        className="border border-gray-300 px-4 py-3 text-center bg-gray-200"
                        style={{ minWidth: "140px", wordBreak: "break-word" }}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredInventory.length > 0 ? (
                    filteredInventory.map((item, index) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3 text-center">{index + 1}</td>
                        <td className="border border-gray-300 px-4 py-3 text-center">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-24 w-auto object-contain mx-auto"
                            />
                          ) : (
                            "--"
                          )}
                        </td>
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
                        <td className="border border-gray-300 px-4 py-3 text-center">{item.accountableTo || "--"}</td>
                        <td className="border border-gray-300 px-4 py-3 text-center">{item.consumable}</td>
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
                      <td colSpan="15" className="border border-gray-300 px-4 py-3 text-center text-gray-500">
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
            <h2 className="text-lg font-bold mb-4">
              {isEditing ? "Edit Inventory Item" : "Add New Inventory Item"}
            </h2>
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Existing inputs */}
                <div><label className="block text-sm font-medium mb-1">Category</label><input name="category" value={newItem.category} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2" /></div>
                <div><label className="block text-sm font-medium mb-1">Name</label><input name="name" value={newItem.name} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2" /></div>
                <div><label className="block text-sm font-medium mb-1">Brand</label><input name="brand" value={newItem.brand} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2" /></div>
                <div><label className="block text-sm font-medium mb-1">Specs</label><input name="specs" value={newItem.specs} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2" /></div>
                <div><label className="block text-sm font-medium mb-1">Pricing</label><input name="pricing" value={newItem.pricing} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2" /></div>
                <div><label className="block text-sm font-medium mb-1">Durability</label><input name="durability" value={newItem.durability} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2" /></div>
                <div><label className="block text-sm font-medium mb-1">Tag</label><input name="tag" value={newItem.tag} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2" /></div>
                <div><label className="block text-sm font-medium mb-1">Quantity</label><input name="quantity" value={newItem.quantity} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2" /></div>
                <div><label className="block text-sm font-medium mb-1">Date</label><input type="date" name="date" value={newItem.date} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2" /></div>
                <div><label className="block text-sm font-medium mb-1">Remarks</label><input name="remarks" value={newItem.remarks} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2" /></div>
                <div><label className="block text-sm font-medium mb-1">Accountable To</label><input name="accountableTo" value={newItem.accountableTo} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2" /></div>
                <div><label className="block text-sm font-medium mb-1">Consumable</label><select name="consumable" value={newItem.consumable} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2"><option value="No">No</option><option value="Yes">Yes</option></select></div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">Image</label>
                <input type="file" accept="image/*" onChange={(e) => {
                  const file = e.target.files[0];
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setNewItem((prev) => ({ ...prev, image: reader.result }));
                  };
                  if (file) reader.readAsDataURL(file);
                }} className="w-full border border-gray-300 rounded-lg p-2" />
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500">Cancel</button>
                <button type="button" onClick={handleAddItem} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">{isEditing ? "Save Changes" : "Add Item"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryManagement;
