// Updated Dashboard with complete modal logic, stats, charts, and actions
import React, { useState } from "react";
import { PackageCheck, PackageX, AlertCircle, Wrench, ClipboardList } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line
} from "recharts";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [projectCount] = useState(8);

  const [availableTools, setAvailableTools] = useState([
    "Makita Drill", "Bosch Grinder", "DeWalt Saw", "Stanley Hammer", "Milwaukee Screwdriver",
    "Impact Driver", "Cordless Screw Gun", "Bench Grinder", "Cut-Off Saw", "Reciprocating Saw"
  ]);

  const [issuedItems, setIssuedItems] = useState([
    "Nail Gun", "Tile Cutter", "Circular Saw", "Jigsaw", "Air Compressor",
    "Concrete Mixer", "Angle Grinder", "Paint Sprayer", "Soldering Iron", "Heat Gun"
  ]);

  const [lowStockItems, setLowStockItems] = useState([
    "Drill Bit Set", "Sandpaper", "Glue Stick", "Cutting Blade", "Masking Tape",
    "Wire Spool", "Safety Gloves", "Zip Ties", "Screws", "Wall Plugs"
  ]);

  const [maintenanceItems, setMaintenanceItems] = useState([
    "Chainsaw - Blade Replacement", "Ladder - Safety Check", "Welder - Calibration", "Grinder - Bearing Check",
    "Drill - Motor Lubrication", "Sander - Dust Collector Clean", "Cutter - Wheel Replacement",
    "Vacuum - Filter Replacement", "Router - Bit Alignment", "Saw - Guard Adjustment"
  ]);

  

  const getCurrentList = () => {
    switch (selectedCategory) {
      case "Available Tools": return availableTools;
      case "Issued Items": return issuedItems;
      case "Low Stock Consumables": return lowStockItems;
      case "Maintenance": return maintenanceItems;
      default: return [];
    }
  };

  const updateList = (newList) => {
    switch (selectedCategory) {
      case "Available Tools": return setAvailableTools(newList);
      case "Issued Items": return setIssuedItems(newList);
      case "Low Stock Consumables": return setLowStockItems(newList);
      case "Maintenance": return setMaintenanceItems(newList);
      default: return;
    }
  };

  const handleCardClick = (category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleAddNewItem = () => {
    if (newItem.trim() !== "") {
      const updatedList = [newItem.trim(), ...getCurrentList()];
      updateList(updatedList);
      setNewItem("");
      setShowUpdateModal(false);
    }
  };

  const stats = {
    available: availableTools.length,
    issued: issuedItems.length,
    lowStock: lowStockItems.length,
    maintenance: maintenanceItems.length,
  };

  const chartData = [
    { name: "Available", value: stats.available },
    { name: "Issued", value: stats.issued },
    { name: "Low Stock", value: stats.lowStock },
    { name: "Maintenance", value: stats.maintenance },
  ];

  const usageTrend = [
    { date: 'Jan', used: 20 },
    { date: 'Feb', used: 35 },
    { date: 'Mar', used: 25 },
    { date: 'Apr', used: 40 },
  ];

  const recentActivity = [
    { item: "Makita Angle Grinder", action: "Returned", quantity: 3, date: "2025-01-02", name: "Nolly Alvarado" },
    { item: "Bosch Circular Saw", action: "Out", quantity: 1, date: "2025-01-01", name: "Ronald Labrado" },
    { item: "Cordless Screw Gun", action: "Out", quantity: 2, date: "2025-01-03", name: "Rica Morales" },
    { item: "DeWalt Saw", action: "Returned", quantity: 1, date: "2025-01-04", name: "Tony Lopez" },
    { item: "Impact Driver", action: "Out", quantity: 1, date: "2025-01-05", name: "Liza Serrano" },
    { item: "Paint Sprayer", action: "Returned", quantity: 2, date: "2025-01-06", name: "Marco Delos Reyes" },
    { item: "Reciprocating Saw", action: "Out", quantity: 3, date: "2025-01-07", name: "Cesar Vega" },
    { item: "Toolbox", action: "Returned", quantity: 1, date: "2025-01-08", name: "Alvin Ong" },
    { item: "Utility Knife", action: "Returned", quantity: 4, date: "2025-01-09", name: "Gina Bernardo" },
    { item: "Heat Gun", action: "Out", quantity: 2, date: "2025-01-10", name: "Jomar Aquino" },
  ];

  return (
    <div className="w-full min-h-screen max-h-screen overflow-y-auto p-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
        {[
          { label: "Available Tools", value: stats.available, icon: <PackageCheck className="text-green-500 w-6 h-6" />, category: "Available Tools" },
          { label: "Issued Items", value: stats.issued, icon: <PackageX className="text-blue-500 w-6 h-6" />, category: "Issued Items" },
          { label: "Low Stock Consumables", value: stats.lowStock, icon: <AlertCircle className="text-red-500 w-6 h-6" />, category: "Low Stock Consumables" },
          { label: "Maintenance", value: stats.maintenance, icon: <Wrench className="text-yellow-500 w-6 h-6" />, category: "Maintenance" },
          { label: "Projects", value: projectCount, icon: <ClipboardList className="text-indigo-500 w-6 h-6" />, category: "Projects" },
        ].map((card, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-200 cursor-pointer"
            onClick={() => handleCardClick(card.category)}>
            <div className="flex items-center justify-between">
              <h2 className="text-md font-semibold text-gray-800">{card.label}</h2>
              {card.icon}
            </div>
            <p className="text-4xl font-extrabold text-gray-700 mt-4">{card.value}</p>
            <p className="text-sm text-gray-500">
              {card.category === "Available Tools" && "Total in stock"}
              {card.category === "Issued Items" && "Currently checked out"}
              {card.category === "Low Stock Consumables" && "Needs restocking"}
              {card.category === "Maintenance" && "Scheduled for this week"}
              {card.category === "Projects" && "Completed projects"}
            </p>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Inventory Overview</h2>
        <div className="bg-white rounded-lg shadow-md p-4">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Line Chart */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Monthly Usage Trend</h2>
        <div className="bg-white rounded-lg shadow-md p-4">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={usageTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="used" stroke="#10b981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto max-h-[35vh]">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-200 text-gray-600 sticky top-0">
                <tr>
                  <th className="px-4 py-2">Item</th>
                  <th className="px-4 py-2">Action</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Return/Out-by</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentActivity.map((activity, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                    <td className="px-4 py-2 max-w-[200px] truncate">{activity.item}</td>
                    <td className={`px-4 py-2 font-semibold ${
                      activity.action === "Returned" ? "text-green-600" :
                      activity.action === "Out" ? "text-blue-600" : "text-red-500"
                    }`}>
                      {activity.action}
                    </td>
                    <td className="px-4 py-2">{activity.quantity}</td>
                    <td className="px-4 py-2">{new Date(activity.date).toLocaleDateString("en-US")}</td>
                    <td className="px-4 py-2">{activity.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Modals */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-lg font-bold mb-4">{selectedCategory}</h2>
            <div className="overflow-y-auto max-h-60 border rounded">
              <ul className="divide-y divide-gray-200">
                {getCurrentList().map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 transition"
                  >
                    <div className="text-gray-800">
                      <span className="font-medium mr-2 text-gray-600">{index + 1}.</span>
                      {item}
                    </div>
                    <button
                      onClick={() => {
                        const updated = getCurrentList().filter((_, i) => i !== index);
                        updateList(updated);
                      }}
                      className="text-red-600 hover:bg-red-100 hover:text-red-700 px-3 py-1 rounded-full text-sm font-semibold transition"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Close
              </button>
              <button
                onClick={() => setShowUpdateModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {showUpdateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-lg font-bold mb-4">Add New Item</h2>
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Enter item name"
              className="w-full border px-3 py-2 rounded mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowUpdateModal(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNewItem}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;