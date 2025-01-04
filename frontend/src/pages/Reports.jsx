import React, { useState, useEffect } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";

const ReportsPage = () => {
  const [reportsData, setReportsData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch reports data
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

  // Headers for CSV export
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
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto shadow-lg rounded-lg overflow-hidden">
        {/* Filters */}
        <div className="sticky top-0 bg-white z-10 border-b px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {/* Date Filters */}
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">Start Date:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-xs"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">End Date:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-xs"
              />
            </div>
          </div>
          {/* Export Button */}
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
        <div className="p-6 bg-white max-h-[500px] overflow-y-auto">
          {isLoading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <table className="w-full text-xs text-center text-gray-600 border-collapse border border-gray-200">
              <thead className="sticky top-0 z-10 bg-white">
                <tr>
                  <th className="border border-gray-200 px-6 py-3">Category</th>
                  <th className="border border-gray-200 px-6 py-3">Name</th>
                  <th className="border border-gray-200 px-6 py-3">Tag/Code</th>
                  <th className="border border-gray-200 px-6 py-3">Quantity</th>
                  <th className="border border-gray-200 px-6 py-3">Unit</th>
                  <th className="border border-gray-200 px-6 py-3">Remarks</th>
                  <th className="border border-gray-200 px-6 py-3">
                    Checked Out By
                  </th>
                  <th className="border border-gray-200 px-6 py-3">Project</th>
                  <th className="border border-gray-200 px-6 py-3">
                    Project Site
                  </th>
                  <th className="border border-gray-200 px-6 py-3">
                    Checked Out Date
                  </th>
                  <th className="border border-gray-200 px-6 py-3">
                    Checked In Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {reportsData.length > 0 ? (
                  reportsData.map((report, index) => (
                    <tr key={index}>
                      <td className="border border-gray-200 px-6 py-3">
                        {report.category}
                      </td>
                      <td className="border border-gray-200 px-6 py-3">
                        {report.name}
                      </td>
                      <td className="border border-gray-200 px-6 py-3">
                        {report.tag}
                      </td>
                      <td className="border border-gray-200 px-6 py-3">
                        {report.quantity}
                      </td>
                      <td className="border border-gray-200 px-6 py-3">
                        {report.unit}
                      </td>
                      <td className="border border-gray-200 px-6 py-3">
                        {report.remarks}
                      </td>
                      <td className="border border-gray-200 px-6 py-3">
                        {report.checkedOutBy}
                      </td>
                      <td className="border border-gray-200 px-6 py-3">
                        {report.project}
                      </td>
                      <td className="border border-gray-200 px-6 py-3">
                        {report.projectSite}
                      </td>
                      <td className="border border-gray-200 px-6 py-3">
                        {report.checkedOutDate}
                      </td>
                      <td className="border border-gray-200 px-6 py-3">
                        {report.checkedInDate}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="11"
                      className="border border-gray-200 px-6 py-3 text-center"
                    >
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
