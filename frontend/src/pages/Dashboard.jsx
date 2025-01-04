import React from "react";
import {
  PackageCheck,
  PackageX,
  AlertCircle,
  RefreshCw,
  Wrench,
  Clock,
} from "lucide-react";

const Dashboard = () => {
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
              Defective Items
            </h2>
            <AlertCircle className="text-red-500 w-6 h-6" />
          </div>
          <p className="text-3xl font-bold text-gray-700 mt-4">12</p>
          <p className="text-sm text-gray-500">Needs repair or replacement</p>
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
          <table className="min-w-full table-auto text-sm text-left">
            <thead className="bg-gray-200 text-gray-600">
              <tr>
                <th className="px-4 py-2">Item</th>
                <th className="px-4 py-2">Action</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              <tr>
                <td className="px-4 py-2">Makita Angle Grinder</td>
                <td className="px-4 py-2 text-green-600 font-semibold">
                  Checked In
                </td>
                <td className="px-4 py-2">3</td>
                <td className="px-4 py-2">2025-01-02</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Bosch Circular Saw</td>
                <td className="px-4 py-2 text-red-600 font-semibold">
                  Checked Out
                </td>
                <td className="px-4 py-2">1</td>
                <td className="px-4 py-2">2025-01-01</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Grass Cutter</td>
                <td className="px-4 py-2 text-green-600 font-semibold">
                  Checked In
                </td>
                <td className="px-4 py-2">2</td>
                <td className="px-4 py-2">2024-12-31</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Welding Machine</td>
                <td className="px-4 py-2 text-yellow-600 font-semibold">
                  Defective
                </td>
                <td className="px-4 py-2">1</td>
                <td className="px-4 py-2">2024-12-30</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
