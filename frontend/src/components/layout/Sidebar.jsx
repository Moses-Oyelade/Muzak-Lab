import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // lightweight icon library

export default function Sidebar() {
  const { user } = useAuth();
  const currentUser = user?.username;
  const role = user?.role;
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/samples", label: "Samples" },
    { to: "/samples/create", label: "Create Sample" },
    { to: "/patients", label: "Patients" },
    { to: "/test-types", label: "Test Types" },
    ...(role === "admin" ? [{ to: "/users", label: "Users" }] : []),
  ];

  return (
    <>
      {/* Toggle button for mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`md:hidden ${isOpen ? "fixed top-4 left-44" :"fixed top-6 left-4"} z-50 p-2 bg-gray-400 text-white rounded-lg`}
      >
        {isOpen ? <X size={24} /> : <Menu size={28} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 min-h-screen w-64 bg-gray-500 text-white p-6 transform transition-transform duration-300 z-40
          ${isOpen ? "translate-x-0 pt-14" : "-translate-x-full"} 
          md:translate-x-0`}
      >
        <h2 className="text-xl font-bold mb-4">Lab Sample Tracker</h2>
        <h2 className="text-lg border-b py-2">{`Welcome ${currentUser ?? ""}`}</h2>
        <aside className="space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `block p-2 rounded transition ${
                  isActive ? "bg-gray-700 font-semibold" : "hover:bg-gray-600"
                }`
              }
              onClick={() => setIsOpen(false)} // auto-close on navigation
            >
              {link.label}
            </NavLink>
          ))}
        </aside>
      </div>
    </>
  );
}
