import React from "react";
import { PackageCheck, PackageX, AlertCircle, Wrench } from "lucide-react";

const Dashboard = () => {
  // List of names
  const names = [
    "Nolly Alvarado",
    "Ronald Labrado",
    "Angelo Padilla",
    "Edan Raymundo",
    "Angelo Padilla",
  ];

  // Sample data for the recent activity table
  const recentActivity = [
    {
      item: "Makita Angle Grinder",
      action: "Checked In",
      quantity: 3,
      date: "2025-01-02",
      name: names[0],
    },
    {
      item: "Bosch Circular Saw",
      action: "Checked Out",
      quantity: 1,
      date: "2025-01-01",
      name: names[1],
    },
    {
      item: "Grass Cutter",
      action: "Checked In",
      quantity: 2,
      date: "2024-12-31",
      name: names[2],
    },
    {
      item: "Welding Machine",
      action: "Defective",
      quantity: 1,
      date: "2024-12-30",
      name: names[3],
    },
    {
      item: "Angle Grinder",
      action: "Checked Out",
      quantity: 4,
      date: "2025-01-05",
      name: names[4],
    },
    {
      item: "Circular Saw",
      action: "Checked In",
      quantity: 5,
      date: "2025-01-03",
      name: names[0],
    },
    {
      item: "Soldering Iron",
      action: "Checked Out",
      quantity: 2,
      date: "2025-01-04",
      name: names[1],
    },
  ];

  return (
    <div className="min-h-screen bg-white rounded-lg shadow-lg m-1 p-6">
      {/* Dashboard Header */}

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Cards Section */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <h2 className="text-md font-semibold text-gray-800">
              Available Tools
            </h2>
            <PackageCheck className="text-green-500 w-6 h-6" />
          </div>
          <p className="text-3xl font-bold text-gray-700 mt-4">128</p>
          <p className="text-sm text-gray-500">Total in stock</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">
              Issued Items
            </h2>
            <PackageX className="text-blue-500 w-6 h-6" />
          </div>
          <p className="text-3xl font-bold text-gray-700 mt-4">54</p>
          <p className="text-sm text-gray-500">Currently checked out</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">
              Low Stock Consumables
            </h2>
            <AlertCircle className="text-red-500 w-6 h-6" />
          </div>
          <p className="text-3xl font-bold text-gray-700 mt-4">12</p>
          <p className="text-sm text-gray-500">Needs restocking</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">Maintenance</h2>
            <Wrench className="text-yellow-500 w-6 h-6" />
          </div>
          <p className="text-3xl font-bold text-gray-700 mt-4">7</p>
          <p className="text-sm text-gray-500">Scheduled for this week</p>
        </div>
      </div>

      {/* Check-In and Check-Out Data */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Activity
        </h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto" style={{ maxHeight: "35vh" }}>
            <table className="min-w-full table-auto text-sm text-left">
              <thead className="bg-gray-200 text-gray-600">
                <tr>
                  <th className="px-4 py-2">Item</th>
                  <th className="px-4 py-2">Action</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Checked-in/Checked-out by</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {recentActivity.map((activity, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">{activity.item}</td>
                    <td className="px-4 py-2 text-green-600 font-semibold">
                      {activity.action}
                    </td>
                    <td className="px-4 py-2">{activity.quantity}</td>
                    <td className="px-4 py-2">{activity.date}</td>
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
