import React, { useState } from "react";

const Check = () => {
  const [inventoryData] = useState([
    {
      category: "Tools/Equipment",
      name: "Contender Welding Machine",
      tag: "POWER-WLDGM_CONTNDR-1",
      quantity: 1,
      unit: "unit",
      remarks: "-",
      date: "2024-09-14",
      checkedOutDate: "2024-09-14",
      checkedInDate: "2024-09-16",
      checkedOutBy: "Nolly Alvarado",
      project: "Construction",
      projectSite: "Manila",
      useStartDate: "2024-09-15",
      useEndDate: "2024-09-17",
      status: "Checked In",
    },
    {
      category: "Tools/Equipment",
      name: "XamaPro Welding Machine",
      tag: "POWER-WLDGM_XMPRO-1",
      quantity: 1,
      unit: "unit",
      remarks: "for repair",
      date: "2024-09-14",
      checkedOutDate: "2024-09-14",
      checkedInDate: "2024-09-16",
      checkedOutBy: "Ronald Labrado",
      project: "Construction",
      projectSite: "Manila",
      useStartDate: "2024-09-15",
      useEndDate: "2024-09-17",
      status: "Checked In",
    },
    {
      category: "Tools/Equipment",
      name: "Makita Angle Grinder",
      tag: "POWER-ANGLGRNDR_MKTA-2",
      quantity: 1,
      unit: "unit",
      remarks: "for repair",
      date: "2024-09-14",
      checkedOutDate: "2024-09-14",
      checkedInDate: "2024-09-17",
      checkedOutBy: "Angelo Padilla",
      project: "Construction",
      projectSite: "Manila",
      useStartDate: "2024-09-15",
      useEndDate: "2024-09-17",
      status: "Checked In",
    },
    {
      category: "Tools/Equipment",
      name: "Bosch Angle Grinder (Isidro)",
      tag: "POWER-ANGLGRNDR_BSCHNEW-1",
      quantity: 1,
      unit: "unit",
      remarks: "UNISSUED",
      date: "2024-09-14",
      checkedOutDate: "2024-09-14",
      checkedInDate: "2024-09-16",
      checkedOutBy: "Edan Raymundo",
      project: "Construction",
      projectSite: "Manila",
      useStartDate: "2024-09-15",
      useEndDate: "2024-09-17",
      status: "Checked In",
    },
    {
      category: "Tools/Equipment",
      name: "Makita Electric Drill",
      tag: "POWER-ELCTRCDRL_MKTA-1",
      quantity: 1,
      unit: "unit",
      remarks: "-",
      date: "2024-09-14",
      checkedOutDate: "2024-09-14",
      checkedInDate: "2024-09-16",
      checkedOutBy: "Angelo Padilla",
      project: "Construction",
      projectSite: "Manila",
      useStartDate: "2024-09-15",
      useEndDate: "2024-09-17",
      status: "Checked In",
    },
    {
      category: "Tools/Equipment",
      name: "DeWalt Angle Grinder",
      tag: "POWER-ANGLGRNDR_DEWALT-1",
      quantity: 1,
      unit: "unit",
      remarks: "for repair",
      date: "2024-09-14",
      checkedOutDate: "2024-09-14",
      checkedInDate: "2024-09-16",
      checkedOutBy: "Nolly Alvarado",
      project: "Construction",
      projectSite: "Manila",
      useStartDate: "2024-09-15",
      useEndDate: "2024-09-17",
      status: "Checked In",
    },
    {
      category: "Tools/Equipment",
      name: "Mekite Cut-Off Machine",
      tag: "POWER-CUTOFF_MKTE-1",
      quantity: 1,
      unit: "unit",
      remarks: "for repair",
      date: "2024-09-14",
      checkedOutDate: "2024-09-14",
      checkedInDate: "2024-09-16",
      checkedOutBy: "Ronald Labrado",
      project: "Construction",
      projectSite: "Manila",
      useStartDate: "2024-09-15",
      useEndDate: "2024-09-17",
      status: "Checked In",
    },
    {
      category: "Tools/Equipment",
      name: "Stihl Chain Saw",
      tag: "POWER-CHNSAW_STHL-1",
      quantity: 1,
      unit: "unit",
      remarks: "-",
      date: "2024-09-14",
      checkedOutDate: "2024-09-14",
      checkedInDate: "2024-09-16",
      checkedOutBy: "Angelo Padilla",
      project: "Construction",
      projectSite: "Manila",
      useStartDate: "2024-09-15",
      useEndDate: "2024-09-17",
      status: "Checked In",
    },
    {
      category: "Tools/Equipment",
      name: "Greenfield Circular Saw",
      tag: "POWER-CRCLRSAW_GRNFLD-1",
      quantity: 1,
      unit: "unit",
      remarks: "-",
      date: "2024-09-14",
      checkedOutDate: "2024-09-14",
      checkedInDate: "2024-09-16",
      checkedOutBy: "Edan Raymundo",
      project: "Construction",
      projectSite: "Manila",
      useStartDate: "2024-09-15",
      useEndDate: "2024-09-17",
      status: "Checked In",
    },
    {
      category: "Tools/Equipment",
      name: "Electric Power Sprayer",
      tag: "POWER-ELCTRCSPRYR-1",
      quantity: 1,
      unit: "unit",
      remarks: "for repair",
      date: "2024-09-14",
      checkedOutDate: "2024-09-14",
      checkedInDate: "2024-09-16",
      checkedOutBy: "Nolly Alvarado",
      project: "Construction",
      projectSite: "Manila",
      useStartDate: "2024-09-15",
      useEndDate: "2024-09-17",
      status: "Checked In",
    },
    {
      category: "Tools/Equipment",
      name: "Makita Angle Grinder",
      tag: "T002",
      quantity: 3,
      unit: "pcs",
      remarks: "for repair",
      date: "2024-12-21",
      checkedOutDate: "2024-12-21",
      checkedInDate: "2024-12-23",
      checkedOutBy: "Edan Raymundo",
      project: "Drainage Work",
      projectSite: "Manila",
      useStartDate: "2024-12-22",
      useEndDate: "2024-12-23",
      status: "Checked In",
    },
    {
      category: "Tools/Equipment",
      name: "Bosch Angle Grinder",
      tag: "T003",
      quantity: 5,
      unit: "pcs",
      remarks: "UNISSUED",
      date: "2024-12-22",
      checkedOutDate: "2024-12-22",
      checkedInDate: "2024-12-24",
      checkedOutBy: "Nolly Alvarado",
      project: "Construction",
      projectSite: "Manila",
      useStartDate: "2024-12-23",
      useEndDate: "2024-12-24",
      status: "Checked In",
    },
    {
      category: "Tools/Equipment",
      name: "Yamato Welding Machine",
      tag: "T004",
      quantity: 2,
      unit: "pcs",
      remarks: "for repair",
      date: "2024-12-23",
      checkedOutDate: "2024-12-23",
      checkedInDate: "2024-12-25",
      checkedOutBy: "Ronald Labrado",
      project: "Drainage Work",
      projectSite: "Manila",
      useStartDate: "2024-12-24",
      useEndDate: "2024-12-25",
      status: "Checked In",
    },
    {
      category: "Tools/Equipment",
      name: "Power Craft Welding Machine",
      tag: "T005",
      quantity: 2,
      unit: "pcs",
      remarks: "c/o Gerold",
      date: "2024-12-24",
      checkedOutDate: "2024-12-24",
      checkedInDate: "2024-12-26",
      checkedOutBy: "Angelo Padilla",
      project: "Construction",
      projectSite: "Manila",
      useStartDate: "2024-12-25",
      useEndDate: "2024-12-26",
      status: "Checked In",
    },
    {
      category: "Tools/Equipment",
      name: "Makita Electric Drill",
      tag: "T006",
      quantity: 1,
      unit: "pcs",
      remarks: "for repair",
      date: "2024-12-25",
      checkedOutDate: "2024-12-25",
      checkedInDate: "2024-12-27",
      checkedOutBy: "Nolly Alvarado",
      project: "Drainage Work",
      projectSite: "Manila",
      useStartDate: "2024-12-26",
      useEndDate: "2024-12-27",
      status: "Checked In",
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const headers = {
    All: [
      { label: "Category", key: "category" },
      { label: "Name", key: "name" },
      { label: "Tag", key: "tag" },
      { label: "Checked Out By", key: "checkedOutBy" },
      { label: "Checked Out Date", key: "checkedOutDate" },
      { label: "Project Site", key: "projectSite" },
      { label: "Use Start Date", key: "useStartDate" },
      { label: "Use End Date", key: "useEndDate" },
      { label: "Status", key: "status" },
    ],
  };

  const filteredData = inventoryData.filter(
    (item) =>
      (selectedCategory === "All" || item.category === selectedCategory) &&
      (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg">
        {/* Top Bar */}
        <div className="sticky top-0 bg-white z-10 border-b px-6 py-4 flex justify-between items-center">
          <div className="flex space-x-4">
            {/* Category Dropdown */}
            <select
              className="bg-gray-50 border border-gray-300 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Tools/Equipment">Tools/Equipment</option>
              <option value="Consumables">Consumables</option>
            </select>

            {/* Search Input */}
            <input
              type="text"
              placeholder="Search items..."
              className="w-60 bg-gray-50 border border-gray-300 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="p-6 bg-white max-h-[395px] overflow-y-auto">
          <table className="w-full text-xs text-center text-gray-600 border-collapse border border-gray-200">
            <thead className="sticky top-0 z-10 bg-white">
              <tr>
                {/* Render dynamic headers */}
                {headers.All.map((header, idx) => (
                  <th
                    key={idx}
                    className="border border-gray-200 px-6 py-3 text-xs text-gray-600"
                  >
                    {header.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, idx) => (
                  <tr key={idx}>
                    {/* Render data */}
                    {headers.All.map((header, index) => (
                      <td
                        key={index}
                        className="border border-gray-200 px-6 py-3 text-xs text-gray-600"
                      >
                        {item[header.key] || "-"}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={headers.All.length}
                    className="border border-gray-200 px-6 py-3 text-center text-xs text-gray-600"
                  >
                    No data found.
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
