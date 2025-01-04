import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar, { SidebarItem } from "./components/Sidebar";
import Headerbar from "./components/Headerbar";
import {
  Boxes,
  Package,
  UserCircle,
  BarChart3,
  LayoutDashboard,
  Settings,
  NotebookTabs,
  Shapes,
} from "lucide-react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import InventoryManagement from "./pages/InventoryManagement";
import Check from "./pages/Check";
import Reports from "./pages/Reports";
import Categories from "./pages/Categories";
import Projects from "./pages/Projects";
import UserManagement from "./pages/UserManagement";
import Setting from "./pages/Setting";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<Login />} />

        {/* Protected Main App Routes */}
        <Route
          path="/app/*"
          element={
            <div className="flex h-screen">
              {/* Sidebar */}
              <Sidebar>
                <SidebarItem
                  icon={<LayoutDashboard size={20} />}
                  text="Dashboard"
                  path="/app/dashboard"
                />
                <SidebarItem
                  icon={<UserCircle size={20} />}
                  text="Inventory Management"
                  path="/app/inventory-management"
                />
                <SidebarItem
                  icon={<Boxes size={20} />}
                  text="Check-In/Check-Out"
                  path="/app/check"
                />
                <SidebarItem
                  icon={<Shapes size={20} />}
                  text="Categories"
                  path="/app/categories"
                />
                <SidebarItem
                  icon={<BarChart3 size={20} />}
                  text="Reports"
                  path="/app/reports"
                />
                <SidebarItem
                  icon={<NotebookTabs size={20} />}
                  text="Projects"
                  path="/app/projects"
                />
                <SidebarItem
                  icon={<Package size={20} />}
                  text="User Management"
                  path="/app/user-management"
                />
                <hr className="my-3" />
                <SidebarItem
                  icon={<Settings size={20} />}
                  text="Settings"
                  path="/app/setting"
                />
              </Sidebar>

              {/* Main Content */}
              <main className="flex-1 bg-gray-100 overflow-hidden">
                <Headerbar className="sticky z-0" />
                <div className="p-2.5">
                  <Routes>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route
                      path="inventory-management"
                      element={<InventoryManagement />}
                    />
                    <Route path="check" element={<Check />} />
                    <Route path="categories" element={<Categories />} />
                    <Route path="reports" element={<Reports />} />
                    <Route path="projects" element={<Projects />} />
                    <Route
                      path="user-management"
                      element={<UserManagement />}
                    />
                    <Route path="setting" element={<Setting />} />
                  </Routes>
                </div>
              </main>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}
