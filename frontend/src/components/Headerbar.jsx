import React from "react";
import { useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Search,
  Bell,
  UserCircle2,
  Check,
  Boxes,
  BarChart3,
  Package,
  LifeBuoy,
} from "lucide-react";

const Headerbar = () => {
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/app/dashboard":
        return (
          <>
            <LayoutDashboard className="inline mr-2 text-indigo-400 w-auto h-8 bg-blue-100 p-2 rounded-lg" />
            Dashboard
          </>
        );
      case "/app/inventory-management":
        return (
          <>
            <UserCircle2 className="inline mr-2 text-indigo-400 w-auto h-8 bg-blue-100 p-2 rounded-lg" />
            Inventory Management
          </>
        );
      case "/app/check":
        return (
          <>
            <Boxes className="inline mr-2 text-indigo-400 w-auto h-8 bg-blue-100 p-2 rounded-lg" />
            Check-In/Check-Out
          </>
        );
      case "/app/reports":
        return (
          <>
            <BarChart3 className="inline mr-2 text-indigo-400 w-auto h-8 bg-blue-100 p-2 rounded-lg" />
            Reports
          </>
        );
      case "/app/user-management":
        return (
          <>
            <Package className="inline mr-2 text-indigo-400 w-auto h-8 bg-blue-100 p-2 rounded-lg" />
            User Management
          </>
        );
      case "/app/settings":
        return (
          <>
            <Settings className="inline mr-2 text-indigo-400 w-auto h-8 bg-blue-100 p-2 rounded-lg" />
            Settings
          </>
        );
      case "/app/help":
        return (
          <>
            <LifeBuoy className="inline mr-2 text-indigo-400 w-auto h-8 bg-blue-100 p-2 rounded-lg" />
            Help
          </>
        );
      default:
        return (
          <>
            <LayoutDashboard className="inline mr-2 text-indigo-400 w-auto h-8 bg-blue-100 p-2 rounded-lg" />
            Dashboard
          </>
        );
    }
  };

  return (
    <header className="sticky top-0 z-20 bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-1.5 px-3 border-b text-xs">
        <div className="relative w-1/3 max-w-sm">
          <input
            type="text"
            className="w-full rounded-full border bg-gray-100 pl-10 pr-4 py-2 placeholder-gray-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Search anything..."
          />
          <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>
        <div className="flex items-center space-x-4">
          <button className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200">
            <Bell className="text-gray-600 w-5 h-5" />
            <span className="absolute top-0 right-0 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
          </button>
          <button className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200">
            <User className="text-gray-600 w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="container mx-auto flex justify-between items-center py-2 px-4 text-xs">
        <h1 className="font-semibold text-gray-700 flex items-center">
          {getPageTitle()}
        </h1>

        <div className="flex space-x-2 text-xs">
          <button className="px-3 py-1 font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200">
            Month to Date
          </button>
          <button className="px-3 py-1 font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200">
            Year to Date
          </button>
        </div>
      </div>
    </header>
  );
};

export default Headerbar;
