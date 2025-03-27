import React, { useState } from "react";
import { Sun, Moon, Trash2 } from "lucide-react";

const SettingsPage = () => {
  const [theme, setTheme] = useState("light");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [categories, setCategories] = useState([
    "Tools/Equipment",
    "Consumables",
    "Vehicles",
  ]);
  const [newCategory, setNewCategory] = useState("");

  const toTitleCase = (str) =>
    str
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase())
      .trim();

  const handleAddCategory = () => {
    const formatted = toTitleCase(newCategory);
    if (formatted === "") {
      alert("Category name cannot be empty.");
      return;
    }

    if (categories.includes(formatted)) {
      alert("Category already exists.");
      return;
    }

    setCategories((prev) => [...prev, formatted]);
    setNewCategory("");
    alert("Category added successfully!");
  };

  const handleDeleteCategory = (cat) => {
    if (confirm(`Delete "${cat}" from categories?`)) {
      setCategories((prev) => prev.filter((c) => c !== cat));
    }
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

  const handleReset = () => {
    setTheme("light");
    setNotificationsEnabled(true);
    setCategories(["Tools/Equipment", "Consumables", "Vehicles"]);
    alert("Settings reset to default.");
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4">
        {/* Left Column */}
        <div className="w-full lg:w-3/4 space-y-6">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800">Settings</h2>
            <p className="text-sm text-gray-500">
              Manage your preferences and account settings.
            </p>
          </div>

          {/* Theme */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Theme</h3>
            <div className="flex items-center space-x-4">
              <Sun className="w-4 h-4 text-yellow-500" />
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={theme === "dark"}
                  onChange={() =>
                    setTheme((prev) => (prev === "light" ? "dark" : "light"))
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600 relative">
                  <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white border rounded-full transition-transform peer-checked:translate-x-5" />
                </div>
              </label>
              <Moon className="w-4 h-4 text-gray-700" />
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Notifications</h3>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                className="h-4 w-4 border border-gray-300 rounded"
              />
              <span className="text-sm text-gray-600">Enable Notifications</span>
            </label>
          </div>

          {/* Save + Reset */}
          <div className="flex justify-end gap-3">
            <button
              onClick={handleReset}
              className="text-gray-600 text-sm hover:underline"
            >
              Reset to Default
            </button>
            <button
              onClick={handleSaveSettings}
              className="bg-blue-600 text-white px-6 py-2 rounded-md text-sm hover:bg-blue-700 transition-all"
            >
              Save Settings
            </button>
          </div>
        </div>

        {/* Right Column (Manage Categories) */}
        <div className="w-full lg:w-1/4">
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-4">
              Manage Categories
            </h3>

            {/* List */}
            <ul className="space-y-2 mb-4">
              {categories.map((category, idx) => (
                <li
                  key={idx}
                  className="text-xs flex justify-between items-center text-gray-700"
                >
                  <span className="truncate">{category}</span>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteCategory(category)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </li>
              ))}
            </ul>

            {/* Add Form */}
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="New category"
                className="w-full p-2 border border-gray-300 rounded text-xs"
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
  );
};

export default SettingsPage;
