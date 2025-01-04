import React, { useState } from "react";

const SettingsPage = () => {
  const [theme, setTheme] = useState("light");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [categories, setCategories] = useState([
    "Tools/Equipment",
    "Consumables",
    "Vehicles",
  ]);
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    if (newCategory.trim() === "") {
      alert("Category name cannot be empty.");
      return;
    }

    if (categories.includes(newCategory.trim())) {
      alert("Category already exists.");
      return;
    }

    setCategories((prevCategories) => [...prevCategories, newCategory.trim()]);
    setNewCategory("");
    alert("Category added successfully!");
  };

  const handleSaveSettings = () => {
    const updatedSettings = {
      theme,
      notificationsEnabled,
      categories,
    };

    console.log("Settings saved:", updatedSettings);
    alert("Settings updated successfully!");
  };

  return (
    <div className="min-h-screen p-1">
      <div className="max-w-7xl mx-auto flex shadow-lg rounded-lg overflow-hidden bg-white">
        {/* Left Container */}
        <div className="w-3/4 p-6 space-y-6">
          <div className="border-b pb-4">
            <h2 className="text-xl font-medium text-gray-700">Settings</h2>
            <p className="text-sm text-gray-500">
              Manage your preferences and account settings.
            </p>
          </div>

          {/* Theme Settings Card */}
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-sm font-medium text-gray-700">Theme</h3>
            <div className="flex items-center mt-2 space-x-3">
              <span className="text-xs text-gray-600">Light</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={theme === "dark"}
                  onChange={() =>
                    setTheme(theme === "light" ? "dark" : "light")
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
              <span className="text-xs text-gray-600">Dark</span>
            </div>
          </div>

          {/* Notifications Card */}
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-sm font-medium text-gray-700">Notifications</h3>
            <label className="flex items-center mt-2 space-x-3">
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                className="h-4 w-4 border border-gray-300 rounded"
              />
              <span className="text-xs text-gray-600">
                Enable Notifications
              </span>
            </label>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSaveSettings}
              className="bg-blue-600 text-white px-6 py-2 rounded-md text-sm hover:bg-blue-700 transition-all"
            >
              Save Settings
            </button>
          </div>
        </div>

        {/* Right Container (Categories) */}
        <div className="w-1/4 p-6 bg-gray-50">
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-sm font-medium text-gray-700">
              Manage Categories
            </h3>
            <div className="mt-4 space-y-2">
              {/* Categories List */}
              <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                {categories.map((category, index) => (
                  <li key={index}>{category}</li>
                ))}
              </ul>

              {/* Add Category Form */}
              <div className="flex items-center space-x-2 mt-4">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="New category"
                  className="w-full p-3 border border-gray-300 rounded-lg text-xs"
                />
                <button
                  onClick={handleAddCategory}
                  className="bg-green-600 text-white px-4 py-2 rounded-md text-xs hover:bg-green-700 transition-all"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
