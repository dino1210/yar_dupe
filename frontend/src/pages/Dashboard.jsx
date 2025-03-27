import React, { useState } from "react";
import { PackageCheck, PackageX, AlertCircle, Wrench } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const availableTools = [
    "Makita Drill", "Bosch Grinder", "DeWalt Saw", "Stanley Hammer", "Milwaukee Screwdriver",
    "Impact Driver", "Cordless Screw Gun", "Bench Grinder", "Cut-Off Saw", "Reciprocating Saw"
  ];

  const issuedItems = [
    "Nail Gun", "Tile Cutter", "Circular Saw", "Jigsaw", "Air Compressor",
    "Concrete Mixer", "Angle Grinder", "Paint Sprayer", "Soldering Iron", "Heat Gun"
  ];

  const lowStockItems = [
    "Drill Bit Set", "Sandpaper", "Glue Stick", "Cutting Blade", "Masking Tape",
    "Wire Spool", "Safety Gloves", "Zip Ties", "Screws", "Wall Plugs"
  ];

  const maintenanceItems = [
    "Chainsaw - Blade Replacement", "Ladder - Safety Check", "Welder - Calibration", "Grinder - Bearing Check",
    "Drill - Motor Lubrication", "Sander - Dust Collector Clean", "Cutter - Wheel Replacement",
    "Vacuum - Filter Replacement", "Router - Bit Alignment", "Saw - Guard Adjustment"
  ];

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

  const handleCardClick = (category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

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
    <div className="w-full min-h-screen max-h-screen overflow-y-auto ...">

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[
          { label: "Available Tools", value: stats.available, icon: <PackageCheck className="text-green-500 w-6 h-6" />, category: "Available Tools" },
          { label: "Issued Items", value: stats.issued, icon: <PackageX className="text-blue-500 w-6 h-6" />, category: "Issued Items" },
          { label: "Low Stock Consumables", value: stats.lowStock, icon: <AlertCircle className="text-red-500 w-6 h-6" />, category: "Low Stock Consumables" },
          { label: "Maintenance", value: stats.maintenance, icon: <Wrench className="text-yellow-500 w-6 h-6" />, category: "Maintenance" }
        ].map((card, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 cursor-pointer"
               onClick={() => handleCardClick(card.category)}>
            <div className="flex items-center justify-between">
              <h2 className="text-md font-semibold text-gray-800">{card.label}</h2>
              {card.icon}
            </div>
            <p className="text-3xl font-bold text-gray-700 mt-4">{card.value}</p>
            <p className="text-sm text-gray-500">
              {card.category === "Available Tools" && "Total in stock"}
              {card.category === "Issued Items" && "Currently checked out"}
              {card.category === "Low Stock Consumables" && "Needs restocking"}
              {card.category === "Maintenance" && "Scheduled for this week"}
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

       {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-lg font-bold mb-4">{selectedCategory}</h2>
            <div className="overflow-y-auto max-h-60 border rounded p-2">
              <ul className="list-disc pl-5">
                {(selectedCategory === "Available Tools" ? availableTools :
                  selectedCategory === "Issued Items" ? issuedItems :
                  selectedCategory === "Low Stock Consumables" ? lowStockItems :
                  selectedCategory === "Maintenance" ? maintenanceItems : []
                ).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <button onClick={() => setShowModal(false)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <section className="mt-8">
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
    </div>
  );
};

export default Dashboard;