import React, { useState, useEffect } from "react";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [expandedProject, setExpandedProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch projects from backend API
  const fetchProjects = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/projects");
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
      const data = await response.json();
      setProjects(data); // Set the projects state with fetched data
    } catch (error) {
      console.error("Error fetching projects:", error.message);
    }
  };

  useEffect(() => {
    fetchProjects(); // Fetch projects when component mounts
  }, []);

  const toggleExpand = (projectId) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-1 overflow-x-hidden">
      <div className="max-w-7xl mx-auto flex flex-wrap shadow-lg rounded-lg overflow-hidden bg-white">
        {/* Left Container (Project List) */}
        <div className="w-full sm:w-2/3 lg:w-3/4 p-6 space-y-4">
          <div className="border-b pb-4">
            <h2 className="text-xl font-sm text-gray-700">Projects</h2>
          </div>

          <div className="space-y-4 max-h-[350px] overflow-y-auto">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-300"
              >
                {/* Collapsed View with Title, Creator, and Dates */}
                <div
                  className="p-4 cursor-pointer flex justify-between items-center hover:bg-gray-100"
                  onClick={() => toggleExpand(project.id)}
                >
                  <div>
                    <h2 className="text-sm font-semibold text-gray-800">
                      {project.title}
                    </h2>
                    <p className="text-xs text-gray-600">
                      <strong>Creator:</strong> {project.creator}
                    </p>
                    <p className="text-xs text-gray-600">
                      <strong>Dates:</strong> {project.startDate} -{" "}
                      {project.endDate}
                    </p>
                  </div>
                  <span>{expandedProject === project.id ? "▲" : "▼"}</span>
                </div>

                {/* Expanded View with Additional Details */}
                {expandedProject === project.id && (
                  <div className="flex p-4 space-x-8">
                    <div className="w-2/3 space-y-4">
                      <div>
                        <p className="text-gray-700 font-medium">
                          <strong>Manager:</strong> {project.manager}
                        </p>
                      </div>
                    </div>

                    <div className="w-1/3">
                      <p className="text-gray-700 font-medium">
                        <strong>Tools/Equipment Used:</strong>
                      </p>
                      <ul className="list-disc pl-5 text-gray-600">
                        {JSON.parse(project.tools).map((tool, index) => (
                          <li key={index}>{tool}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Container (Search Bar and Filters) */}
        <div className="w-full sm:w-1/3 lg:w-1/4 p-6 h-full">
          <div className="p-6 bg-white shadow-md rounded-lg h-full flex flex-col justify-between">
            <h3 className="text-sm font-medium text-gray-700">
              Search Project
            </h3>
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-3 border border-gray-300 rounded-lg mt-4 text-gray-700 mb-6"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
