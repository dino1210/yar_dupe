import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "/src/assets/images/logo.png";

// Create Context for Sidebar State
const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);

  // Fetch user data from localStorage or context
  const [user, setUser] = useState({
    name: "Guest User", // Default placeholder
    email: "guest@example.com", // Default placeholder
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser); // Update user state with the data from localStorage
    }
  }, []);

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        {/* Logo and Toggle Button */}
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src={logo}
            className={`overflow-hidden transition-all ${
              expanded ? "w-8" : "w-0"
            }`}
            alt="Logo"
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        {/* Sidebar Items */}
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        {/* User Profile */}
        <div className="border-t flex p-3">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt="Profile Avatar"
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            <div className="leading-4">
              <h4 className="font-semibold">{user.username}</h4>
              <span className="text-xs text-gray-600">{user.email}</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, path, alert }) {
  const { expanded } = useContext(SidebarContext);
  const location = useLocation();

  // Check if the current route matches the path to highlight active item
  const isActive = location.pathname === path;

  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          isActive
            ? "bg-gradient-to-tr from-blue-200 to-blue-100 text-blue-800"
            : "hover:bg-blue-50 text-gray-600"
        }
    `}
    >
      <Link to={path} className="flex items-center">
        {icon}
        <span
          className={`overflow-hidden transition-all text-xs ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>
        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
              expanded ? "" : "top-2"
            }`}
          />
        )}
      </Link>

      {!expanded && (
        <div
          className={`absolute left-full rounded-md px-2 py-1 ml-6
          bg-blue-100 text-blue-800 text-sm 
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )}
    </li>
  );
}
