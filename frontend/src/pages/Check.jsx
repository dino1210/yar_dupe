import React, { useState } from "react";
import { format } from "date-fns";
import { CSVLink } from "react-csv";

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

  const headers = [
    { label: "Category", key: "category" },
    { label: "Name", key: "name" },
    { label: "Tag", key: "tag" },
    { label: "Checked Out By", key: "checkedOutBy" },
    { label: "Checked Out Date", key: "checkedOutDate" },
    { label: "Project Site", key: "projectSite" },
    { label: "Use Start Date", key: "useStartDate" },
    { label: "Use End Date", key: "useEndDate" },
    { label: "Status", key: "status" }
  ];

  const formatDate = (dateStr) => {
    try {
      return format(new Date(dateStr), "MMM dd, yyyy");
    } catch {
      return dateStr;
    }
  };

  const highlightText = (text, search) => {
    if (!search) return text;
    const parts = text.split(new RegExp(`(${search})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <span key={i} className="bg-yellow-200 font-semibold">{part}</span>
      ) : (
        part
      )
    );
  };

  const filteredData = inventoryData.filter(
    (item) =>
      (selectedCategory === "All" || item.category === selectedCategory) &&
      (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
   <div className="min-h-screen w-full bg-gray-100 p-4">
  <div className="w-full bg-white shadow-md rounded-lg p-4">

        {/* Top Bar */}
        <div className="sticky top-0 bg-white z-10 border-b px-6 py-4 flex justify-between items-center flex-wrap gap-2">
          <div className="flex flex-wrap space-x-2 items-center">
            {/* Category Dropdown */}
            <select
              className="bg-gray-50 border border-gray-300 text-xs rounded-lg p-2.5"
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
              className="w-60 bg-gray-50 border border-gray-300 text-xs rounded-lg p-2.5"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Export Button */}
          <CSVLink
            data={filteredData}
            headers={headers}
            filename="checkin_checkout_data.csv"
            className="bg-blue-500 text-white px-4 py-2 rounded text-xs hover:bg-blue-600"
          >
            Export CSV
          </CSVLink>
        </div>

        {/* Table Section */}
        {/* Table Section */}
<div className="overflow-auto mt-4 max-h-[500px]">
  <table className="min-w-[1000px] w-full border-collapse text-sm text-gray-600">
    <thead className="sticky top-0 z-10 bg-gray-200 text-gray-800 shadow-md">
  <tr>
    {headers.map((header, idx) => (
      <th
        key={idx}
        className="border border-gray-300 px-6 py-3 text-xs font-semibold text-center"
        style={{ whiteSpace: "nowrap" }}
      >
        {header.label}
      </th>
    ))}
  </tr>
</thead>

    <tbody>
      {filteredData.length > 0 ? (
        filteredData.map((item, idx) => (
          <tr key={idx} className="hover:bg-gray-50">
            {headers.map((header, index) => {
              const value = item[header.key];
              let content = value;

              if (
                ["checkedOutDate", "useStartDate", "useEndDate"].includes(
                  header.key
                )
              ) {
                content = formatDate(value);
              }

              if (["name", "tag"].includes(header.key)) {
                content = highlightText(value, searchTerm);
              }

              if (header.key === "status") {
                content = (
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      value === "Checked In"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {value}
                  </span>
                );
              }

              return (
                <td
                  key={index}
                  className="border border-gray-200 px-6 py-3 text-xs text-gray-700 text-center align-middle"
                  style={{ wordBreak: "break-word" }}
                >
                  {content || "-"}
                </td>
              );
            })}
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan={headers.length}
            className="border border-gray-200 px-6 py-3 text-center text-xs text-gray-700"
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
