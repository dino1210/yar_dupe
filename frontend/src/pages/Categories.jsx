import React, { useState, useEffect } from "react";
import axios from "axios";
import { Edit2, Trash2 } from "lucide-react";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newSubcategory, setNewSubcategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newSubcategoryInModal, setNewSubcategoryInModal] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch categories
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const toTitleCase = (str) =>
    str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());

  // Add Category
  const handleAddCategory = () => {
    const formatted = toTitleCase(newCategory.trim());
    if (formatted !== "") {
      axios
        .post("http://localhost:5000/api/categories", { name: formatted })
        .then(() => {
          setCategories([...categories, { name: formatted, subcategories: [] }]);
          setNewCategory("");
          alert("Category added!");
        })
        .catch((error) => console.error("Error adding category:", error));
    }
  };

  // Add Subcategory
  const handleAddSubcategory = () => {
    const formatted = toTitleCase(newSubcategory.trim());
    if (formatted !== "" && selectedCategory) {
      const category = categories.find((cat) => cat.name === selectedCategory);
      if (category?.subcategories.includes(formatted)) {
        alert("Subcategory already exists.");
        return;
      }

      axios
        .post("http://localhost:5000/api/subcategories", {
          name: formatted,
          categoryId: selectedCategory,
        })
        .then(() => {
          const updatedCategories = categories.map((category) =>
            category.name === selectedCategory
              ? {
                  ...category,
                  subcategories: [...category.subcategories, formatted],
                }
              : category
          );
          setCategories(updatedCategories);
          setNewSubcategory("");
          alert("Subcategory added!");
        })
        .catch((error) => console.error("Error adding subcategory:", error));
    }
  };

  // Modal
  const handleOpenModal = (category) => {
    setEditingCategory(category);
    setNewSubcategoryInModal("");
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const handleAddSubcategoryInModal = () => {
    const formatted = toTitleCase(newSubcategoryInModal.trim());
    if (formatted !== "") {
      if (editingCategory.subcategories.includes(formatted)) {
        alert("Subcategory already exists.");
        return;
      }

      const updatedCategory = {
        ...editingCategory,
        subcategories: [...editingCategory.subcategories, formatted],
      };
      setEditingCategory(updatedCategory);
      setNewSubcategoryInModal("");
      alert("Subcategory added in modal!");
    }
  };

  const handleDeleteSubcategoryInModal = (subcategory) => {
    const updatedCategory = {
      ...editingCategory,
      subcategories: editingCategory.subcategories.filter((sub) => sub !== subcategory),
    };
    setEditingCategory(updatedCategory);
    alert("Subcategory deleted from modal.");
  };

  const handleDeleteCategory = (categoryName) => {
    if (!window.confirm(`Delete category "${categoryName}"?`)) return;

    axios
      .delete(`http://localhost:5000/api/categories/${categoryName}`)
      .then(() => {
        setCategories(categories.filter((category) => category.name !== categoryName));
        alert("Category deleted!");
      })
      .catch((error) => console.error("Error deleting category:", error));
  };

  const handleDeleteSubcategory = (subcategory) => {
    axios
      .delete(`http://localhost:5000/api/subcategories/${subcategory}`)
      .then(() => {
        const updatedCategories = categories.map((category) => {
          if (category.subcategories.includes(subcategory)) {
            return {
              ...category,
              subcategories: category.subcategories.filter((sub) => sub !== subcategory),
            };
          }
          return category;
        });
        setCategories(updatedCategories);
        alert("Subcategory deleted!");
      })
      .catch((error) => console.error("Error deleting subcategory:", error));
  };

  return (
    <div className="min-h-screen p-1">
      <div className="max-w-7xl mx-auto shadow-lg rounded-lg overflow-hidden">

        {/* Header Actions */}
        <div className="bg-white flex justify-between items-center border-b z-20 p-4">
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="New Category Name"
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg p-2"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-xs hover:bg-blue-700"
              onClick={handleAddCategory}
            >
              Add Category
            </button>
          </div>

          <div className="flex space-x-2 items-center">
            <select
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg p-2"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            {selectedCategory && (
              <>
                <input
                  type="text"
                  placeholder="New Subcategory Name"
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg p-2"
                  value={newSubcategory}
                  onChange={(e) => setNewSubcategory(e.target.value)}
                />
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded-md text-xs hover:bg-green-700"
                  onClick={handleAddSubcategory}
                >
                  Add Subcategory
                </button>
              </>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto p-6 bg-white">
          <table className="w-full text-xs text-center text-gray-600 border-collapse border border-gray-200">
            <thead className="sticky top-0 z-10 bg-gray-200 text-gray-800">
              <tr>
                <th className="border border-gray-300 px-6 py-3">Category</th>
                <th className="border border-gray-300 px-6 py-3">Subcategories</th>
                <th className="border border-gray-300 px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <tr key={category.name}>
                    <td className="border border-gray-200 px-6 py-3">
                      {category.name}
                    </td>
                    <td className="border border-gray-200 px-6 py-3 text-left">
                      <div
                        className="max-w-xs truncate"
                        title={category.subcategories.join(", ")}
                      >
                        {category.subcategories.length > 0
                          ? category.subcategories.join(", ")
                          : "No subcategories"}
                      </div>
                    </td>
                    <td className="border border-gray-200 px-6 py-3">
                      <button
                        className="text-yellow-500 mr-2"
                        onClick={() => handleOpenModal(category)}
                        title="Edit Subcategories"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        className="text-red-500"
                        onClick={() => handleDeleteCategory(category.name)}
                        title="Delete Category"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="border px-6 py-3 text-center text-gray-500">
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {isModalOpen && editingCategory && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg w-96 max-h-[90vh] p-6 flex flex-col overflow-hidden">
              <h3 className="text-lg font-semibold mb-4">
                Edit Subcategories for {editingCategory.name}
              </h3>

              <div className="flex-1 overflow-y-auto space-y-2 mb-4">
                {editingCategory.subcategories.map((sub, index) => (
                  <div key={sub} className="flex justify-between items-center">
                    <span className="text-sm">{sub}</span>
                    <button
                      className="text-red-500 text-xs"
                      onClick={() => handleDeleteSubcategoryInModal(sub)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-4">
                <input
                  type="text"
                  placeholder="New Subcategory Name"
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg p-2 w-full"
                  value={newSubcategoryInModal}
                  onChange={(e) => setNewSubcategoryInModal(e.target.value)}
                />
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded-md text-xs w-full hover:bg-green-700"
                  onClick={handleAddSubcategoryInModal}
                >
                  Add Subcategory
                </button>
              </div>

              <div className="flex justify-between">
                <button
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-xs hover:bg-gray-400"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-xs hover:bg-blue-700"
                  onClick={handleCloseModal}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
