import React, { useState, useEffect } from "react";
import axios from "axios";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newSubcategory, setNewSubcategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newSubcategoryInModal, setNewSubcategoryInModal] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch categories from the backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // Add a new category
  const handleAddCategory = () => {
    if (newCategory.trim() !== "") {
      axios
        .post("http://localhost:5000/api/categories", { name: newCategory })
        .then(() => {
          setCategories([
            ...categories,
            { name: newCategory, subcategories: [] },
          ]);
          setNewCategory("");
        })
        .catch((error) => console.error("Error adding category:", error));
    }
  };

  // Add a new subcategory
  const handleAddSubcategory = () => {
    if (newSubcategory.trim() !== "" && selectedCategory) {
      axios
        .post("http://localhost:5000/api/subcategories", {
          name: newSubcategory,
          categoryId: selectedCategory,
        })
        .then(() => {
          const updatedCategories = categories.map((category) =>
            category.name === selectedCategory
              ? {
                  ...category,
                  subcategories: [...category.subcategories, newSubcategory],
                }
              : category
          );
          setCategories(updatedCategories);
          setNewSubcategory("");
        })
        .catch((error) => console.error("Error adding subcategory:", error));
    }
  };

  // Open modal for editing subcategories
  const handleOpenModal = (category) => {
    setEditingCategory(category);
    setNewSubcategoryInModal("");
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  // Add subcategory inside modal
  const handleAddSubcategoryInModal = () => {
    if (newSubcategoryInModal.trim() !== "") {
      const updatedCategory = {
        ...editingCategory,
        subcategories: [
          ...editingCategory.subcategories,
          newSubcategoryInModal,
        ],
      };
      setEditingCategory(updatedCategory);
      setNewSubcategoryInModal("");
    }
  };

  // Delete subcategory inside modal
  const handleDeleteSubcategoryInModal = (subcategory) => {
    const updatedCategory = {
      ...editingCategory,
      subcategories: editingCategory.subcategories.filter(
        (sub) => sub !== subcategory
      ),
    };
    setEditingCategory(updatedCategory);
  };

  // Delete category
  const handleDeleteCategory = (categoryName) => {
    axios
      .delete(`http://localhost:5000/api/categories/${categoryName}`)
      .then(() => {
        setCategories(
          categories.filter((category) => category.name !== categoryName)
        );
      })
      .catch((error) => console.error("Error deleting category:", error));
  };

  // Delete subcategory
  const handleDeleteSubcategory = (subcategory) => {
    axios
      .delete(`http://localhost:5000/api/subcategories/${subcategory}`)
      .then(() => {
        const updatedCategories = categories.map((category) => {
          if (category.subcategories.includes(subcategory)) {
            return {
              ...category,
              subcategories: category.subcategories.filter(
                (sub) => sub !== subcategory
              ),
            };
          }
          return category;
        });
        setCategories(updatedCategories);
      })
      .catch((error) => console.error("Error deleting subcategory:", error));
  };

  return (
    <div className="min-h-screen p-1">
      <div className="max-w-7xl mx-auto shadow-lg rounded-lg overflow-hidden">
        {/* Action Header */}
        <div className="p-6 bg-white flex justify-between items-center border-b z-20">
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="New Category Name"
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg p-2 mr-4"
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
          <div className="flex space-x-4">
            <select
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg p-2"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((category, idx) => (
                <option key={idx} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            {selectedCategory && (
              <div className="flex space-x-4">
                <input
                  type="text"
                  placeholder="New Subcategory Name"
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg p-2 mr-4"
                  value={newSubcategory}
                  onChange={(e) => setNewSubcategory(e.target.value)}
                />
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded-md text-xs hover:bg-green-700"
                  onClick={handleAddSubcategory}
                >
                  Add Subcategory
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Categories Table */}
        <div className="overflow-x-auto p-6 bg-white">
          <table className="w-full text-xs text-center text-gray-600 border-collapse border border-gray-200">
            <thead className="sticky top-0 z-10 bg-white">
              <tr>
                <th className="border border-gray-200 px-6 py-3">Category</th>
                <th className="border border-gray-200 px-6 py-3">
                  Subcategories
                </th>
                <th className="border border-gray-200 px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((category, idx) => (
                  <tr key={idx}>
                    <td className="border border-gray-200 px-6 py-3">
                      {category.name}
                    </td>
                    <td className="border border-gray-200 px-6 py-3">
                      {category.subcategories.length > 0
                        ? category.subcategories.join(", ")
                        : "No subcategories"}
                    </td>
                    <td className="border border-gray-200 px-6 py-3">
                      <button
                        className="text-yellow-500 text-xs mr-2"
                        onClick={() => handleOpenModal(category)}
                      >
                        Edit Subcategories
                      </button>
                      <button
                        className="text-red-500 text-xs"
                        onClick={() => handleDeleteCategory(category.name)}
                      >
                        Delete Category
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="border border-gray-200 px-6 py-3 text-center"
                  >
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
            <div className="bg-white p-8 rounded-lg max-w-lg w-full">
              <h3 className="text-lg font-semibold mb-4">
                Edit Subcategories for {editingCategory.name}
              </h3>

              {/* Display Existing Subcategories */}
              <div className="space-y-2 mb-4">
                {editingCategory.subcategories.map((sub, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span>{sub}</span>
                    <button
                      className="text-red-500 text-xs"
                      onClick={() => handleDeleteSubcategoryInModal(sub)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>

              {/* Add New Subcategory */}
              <div className="flex space-x-4 mb-4">
                <input
                  type="text"
                  placeholder="New Subcategory Name"
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg p-2 mr-4"
                  value={newSubcategoryInModal}
                  onChange={(e) => setNewSubcategoryInModal(e.target.value)}
                />
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded-md text-xs hover:bg-green-700"
                  onClick={handleAddSubcategoryInModal}
                >
                  Add Subcategory
                </button>
              </div>

              <div className="flex justify-between">
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-xs hover:bg-blue-700"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded-md text-xs hover:bg-green-700"
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
