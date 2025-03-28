import React, { useState, useEffect } from "react";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [expandedProject, setExpandedProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");

  const fetchProjects = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/projects");
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error.message);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const toggleExpand = (projectId) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  const getStatus = (start, end) => {
    const now = new Date();
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (now < startDate) return "Planned";
    if (now > endDate) return "Completed";
    return "Ongoing";
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Planned":
        return "bg-yellow-200 text-yellow-800";
      case "Completed":
        return "bg-gray-300 text-gray-800";
      case "Ongoing":
        return "bg-green-200 text-green-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const handleSortChange = (e) => {
    const option = e.target.value;
    setSortOption(option);

    const sorted = [...projects].sort((a, b) => {
      if (option === "title") {
        return a.title.localeCompare(b.title);
      } else if (option === "startDate") {
        return new Date(a.startDate) - new Date(b.startDate);
      } else if (option === "endDate") {
        return new Date(a.endDate) - new Date(b.endDate);
      }
      return 0;
    });

    setProjects(sorted);
  };

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full p-4 bg-gray-100 overflow-x-hidden">
      <div className="w-full flex flex-wrap shadow-lg rounded-lg overflow-hidden bg-white">

        {/* Left Panel */}
        <div className="w-full sm:w-2/3 lg:w-3/4 p-6 space-y-4">
          <div className="border-b pb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-700">Projects</h2>
            <select
              onChange={handleSortChange}
              value={sortOption}
              className="border border-gray-300 rounded p-2 text-sm"
            >
              <option value="">Sort by</option>
              <option value="title">Title</option>
              <option value="startDate">Start Date</option>
              <option value="endDate">End Date</option>
            </select>
          </div>

          <div className="space-y-4 max-h-[80vh] overflow-y-auto pr-2">
            {filteredProjects.length === 0 ? (
              <p className="text-center text-gray-500">No projects found.</p>
            ) : (
              filteredProjects.map((project) => {
                const status = getStatus(project.startDate, project.endDate);
                return (
                  <div
                    key={project.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-300"
                  >
                    <div
                      className="p-4 cursor-pointer flex justify-between items-center hover:bg-gray-100"
                      onClick={() => toggleExpand(project.id)}
                    >
                      <div>
                        <h2 className="text-sm font-semibold text-gray-800">{project.title}</h2>
                        <p className="text-xs text-gray-600">
                          <strong>Creator:</strong> {project.creator}
                        </p>
                        <p className="text-xs text-gray-600">
                          <strong>Dates:</strong> {project.startDate} - {project.endDate}
                        </p>
                        <span
                          className={`text-xs px-2 py-1 rounded mt-1 inline-block ${getStatusBadgeClass(
                            status
                          )}`}
                        >
                          {status}
                        </span>
                      </div>
                      <span>{expandedProject === project.id ? "▲" : "▼"}</span>
                    </div>

                    {expandedProject === project.id && (
                      <div className="flex p-4 space-x-8">
                        <div className="w-2/3 space-y-4">
                          <p className="text-gray-700 font-medium">
                            <strong>Manager:</strong> {project.manager}
                          </p>
                          <p className="text-gray-700 font-medium">
                            <strong>Person in Charge:</strong>{" "}
                            {project.personInCharge || "Not Assigned"}
                          </p>
                        </div>

                        <div className="w-1/3">
                          <p className="text-gray-700 font-medium">
                            <strong>Tools/Equipment Used:</strong>
                          </p>
                          <ul className="list-disc pl-5 text-gray-600">
                            {(() => {
                              try {
                                return JSON.parse(project.tools).map((tool, index) => (
                                  <li key={index}>{tool}</li>
                                ));
                              } catch (error) {
                                console.error("Error parsing tools:", error);
                                return <li>Error loading tools</li>;
                              }
                            })()}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Panel (Search Only) */}
        <div className="w-full sm:w-1/3 lg:w-1/4 p-6 bg-gray-50">
          <div className="bg-white shadow-md rounded-lg p-4 flex flex-col space-y-4">
            <h3 className="text-md font-semibold text-gray-800">Search Project</h3>

            <input
              type="text"
              placeholder="Search by title..."
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Floating Add Project Button */}
      <button
        title="Add Project"
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 text-xl"
        onClick={() => alert("Add Project clicked!")}
      >
        +
      </button>
    </div>
  );
};

export default Projects;
