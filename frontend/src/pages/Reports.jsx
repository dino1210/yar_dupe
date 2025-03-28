import React, { useState, useEffect } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";

const ReportsPage = () => {
  const [reportsData, setReportsData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/reports", {
          params: { startDate, endDate },
        });
        setReportsData(response.data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, [startDate, endDate]);

  const csvHeaders = [
    { label: "Category", key: "category" },
    { label: "Name", key: "name" },
    { label: "Tag/Code", key: "tag" },
    { label: "Quantity", key: "quantity" },
    { label: "Unit", key: "unit" },
    { label: "Remarks", key: "remarks" },
    { label: "Checked Out By", key: "checkedOutBy" },
    { label: "Project", key: "project" },
    { label: "Project Site", key: "projectSite" },
    { label: "Checked Out Date", key: "checkedOutDate" },
    { label: "Checked In Date", key: "checkedInDate" },
  ];

  return (
    <div className="min-h-screen w-full bg-gray-100 p-4">
      <div className="w-full bg-white shadow-md rounded-lg overflow-hidden">

        {/* Filters */}
        <div className="sticky top-0 z-10 bg-white border-b px-4 py-4 flex flex-wrap justify-between items-center gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Start Date:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-xs"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">End Date:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-xs"
              />
            </div>
          </div>

          <CSVLink
            data={reportsData}
            headers={csvHeaders}
            filename="reports.csv"
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-xs hover:bg-blue-700"
          >
            Export CSV
          </CSVLink>
        </div>

        {/* Table Section */}
        <div className="p-4 bg-white max-h-[80vh] overflow-y-auto">
          {isLoading ? (
            <div className="text-center text-sm text-gray-600">Loading...</div>
          ) : (
            <table className="w-full text-xs text-center text-gray-600 border-collapse border border-gray-200">
              <thead className="sticky top-0 z-10 bg-gray-100 text-gray-800 shadow-sm">
                <tr>
                  {csvHeaders.map((header) => (
                    <th key={header.key} className="border border-gray-200 px-4 py-2">
                      {header.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reportsData.length > 0 ? (
                  reportsData.map((report, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">{report.category}</td>
                      <td className="border px-4 py-2">{report.name}</td>
                      <td className="border px-4 py-2">{report.tag}</td>
                      <td className="border px-4 py-2">{report.quantity}</td>
                      <td className="border px-4 py-2">{report.unit}</td>
                      <td className="border px-4 py-2">{report.remarks}</td>
                      <td className="border px-4 py-2">{report.checkedOutBy}</td>
                      <td className="border px-4 py-2">{report.project}</td>
                      <td className="border px-4 py-2">{report.projectSite}</td>
                      <td className="border px-4 py-2">{report.checkedOutDate}</td>
                      <td className="border px-4 py-2">{report.checkedInDate}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11" className="border px-4 py-4 text-center text-gray-500">
                      No reports found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
