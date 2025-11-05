import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Sidebar() {
  const { user } = useAuth();
  const currentUser = user?.username;
  const role = user?.role;
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/samples", label: "Samples" },
    { to: "/create-sample", label: "Collect Sample" },
    { to: "/patients", label: "Patients" },
    { to: "/test-types", label: "Test Types" },
    ...(role === "admin" ? [{ to: "/users", label: "Users" }] : []),
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`md:hidden fixed top-6 left-8 z-50 p-2 ${!isOpen ? "bg-gray-400 text-white rounded-lg" : ''}`}
      >
        {!isOpen && <Menu size={30} /> }
      </button>

      {/* Overlay (click to close) */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static left-0 top-0 min-h-screen bg-gray-500 text-white p-6 transform transition-transform duration-300 z-40
          ${isOpen ? "translate-x-0 pt-14 w-64" : "-translate-x-full"} 
          md:translate-x-0`}
      >
        {/* Close button (mobile only) */}
        <button
          onClick={() => setIsOpen(false)}
          className="md:hidden absolute top-4 right-4 z-50 p-2 bg-gray-400 text-white rounded-lg"
        >
          <X size={24} />
        </button>

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
