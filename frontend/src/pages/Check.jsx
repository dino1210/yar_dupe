import React, { useState } from "react";

const Check = () => {
  const [inventoryData] = useState([
    // Sample Tools/Equipment data
    {
      category: "Tools/Equipment",
      name: "Contender Welding Machine",
      tag: "T001",
      quantity: 2,
      unit: "pcs",
      remarks: "-",
      date: "2024-12-20",
      checkedOutDate: "2024-12-20",
      checkedInDate: "2024-12-22",
      checkedOutBy: "John Doe",
      project: "Construction",
      projectSite: "Site A",
      useStartDate: "2024-12-21",
      useEndDate: "2024-12-23",
      status: "Checked In",
    },
    {
      category: "Tools/Equipment",
      name: "XamaPro Welding Machine",
      tag: "T002",
      quantity: 1,
      unit: "pcs",
      remarks: "-",
      date: "2024-12-21",
      checkedOutDate: "2024-12-21",
      checkedInDate: "-",
      checkedOutBy: "Jane Doe",
      project: "Maintenance",
      projectSite: "Site B",
      useStartDate: "2024-12-21",
      useEndDate: "2024-12-25",
      status: "Checked Out",
    },
    // Sample Consumables data
    {
      category: "Consumables",
      name: "Cutting Discs",
      tag: "C001",
      quantity: 15,
      unit: "pcs",
      remarks: "-",
      date: "2024-12-18",
      checkedOutDate: "2024-12-18",
      checkedInDate: "2024-12-20",
      checkedOutBy: "John Doe",
      project: "Construction",
      projectSite: "Site A",
      useStartDate: "2024-12-19",
      useEndDate: "2024-12-21",
      status: "Checked In",
    },
    {
      category: "Consumables",
      name: "Drill Bits",
      tag: "C002",
      quantity: 30,
      unit: "pcs",
      remarks: "-",
      date: "2024-12-19",
      checkedOutDate: "2024-12-19",
      checkedInDate: "-",
      checkedOutBy: "Jane Doe",
      project: "Repair",
      projectSite: "Site C",
      useStartDate: "2024-12-20",
      useEndDate: "2024-12-22",
      status: "Checked Out",
    },
    // Sample Vehicles data
    {
      category: "Vehicles",
      name: "Forklift",
      tag: "V001",
      quantity: 1,
      unit: "-",
      remarks: "Needs maintenance",
      date: "2024-12-15",
      checkedOutDate: "2024-12-15",
      checkedInDate: "2024-12-16",
      checkedOutBy: "John Smith",
      project: "Construction",
      projectSite: "Site D",
      useStartDate: "2024-12-15",
      useEndDate: "2024-12-16",
      status: "Checked In",
    },
    {
      category: "Vehicles",
      name: "Truck",
      tag: "V002",
      quantity: 2,
      unit: "-",
      remarks: "-",
      date: "2024-12-16",
      checkedOutDate: "2024-12-16",
      checkedInDate: "-",
      checkedOutBy: "Alice Brown",
      project: "Delivery",
      projectSite: "Site E",
      useStartDate: "2024-12-17",
      useEndDate: "2024-12-18",
      status: "Checked Out",
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = inventoryData.filter(
    (item) =>
      (selectedCategory === "All" || item.category === selectedCategory) &&
      (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Define headers for each category with the updated order
  const headers = {
    All: [
      "Category",
      "Name",
      "Tag/Code",
      "Checked Out By",
      "Checked Out Date",
      "Project",
      "Project Site",
      "Use Start Date",
      "Use End Date",
      "Status",
    ],
    "Tools/Equipment": [
      "Name",
      "Tag/Code",
      "Checked Out By",
      "Checked Out Date",
      "Project",
      "Project Site",
      "Use Start Date",
      "Use End Date",
      "Status",
    ],
    Consumables: [
      "Name",
      "Tag/Code",
      "Checked Out By",
      "Checked Out Date",
      "Project",
      "Use Start Date",
      "Use End Date",
      "Status",
    ],
    Vehicles: [
      "Name",
      "Tag/Code",
      "Checked Out By",
      "Checked Out Date",
      "Project",
      "Status",
    ],
  };

  return (
    <div className="min-h-screen p-1">
      <div className="max-w-7xl mx-auto shadow-lg rounded-lg overflow-hidden">
        {/* Top Bar */}
        <div className="sticky top-0 bg-white z-10 border-b px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {/* Filter Dropdown */}
            <select
              className="bg-gray-50 border border-gray-300 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Tools/Equipment">Tools/Equipment</option>
              <option value="Consumables">Consumables</option>
              <option value="Vehicles">Vehicles</option>
            </select>

            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search items..."
              className="w-72 bg-gray-50 border border-gray-300 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Add Button */}
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-xs hover:bg-blue-700">
            + Add Item
          </button>
        </div>

        {/* Table Section */}
        <div className="p-6 bg-white max-h-[395px] overflow-y-auto">
          <table className="w-full text-xs text-center text-gray-600 border-collapse border border-gray-200">
            <thead className="sticky top-0 z-10 bg-white">
              <tr>
                {/* Render the dynamic headers based on selected category */}
                {headers[selectedCategory].map((header, index) => (
                  <th key={index} className="border border-gray-200 px-6 py-3">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr key={index}>
                    {/* Render the data based on selected category */}
                    {headers[selectedCategory].map((header, i) => {
                      const value =
                        item[header.toLowerCase().replace(/\s/g, "")]; // Access the correct property
                      return (
                        <td
                          key={i}
                          className="border border-gray-200 px-6 py-3"
                        >
                          {value || "-"}
                        </td>
                      );
                    })}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={headers[selectedCategory].length}
                    className="border border-gray-200 px-6 py-3 text-center"
                  >
                    No items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Check;
