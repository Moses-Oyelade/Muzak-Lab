// src/layouts/DashboardLayout.jsx
import Sidebar from './Sidebar';
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex relative">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 p-2 bg-gray-100 min-h-screen">
        <Outlet /> {/* Renders the child route content */}
      </div>
    </div>
  );
}
