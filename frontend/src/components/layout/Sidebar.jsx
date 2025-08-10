import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Lab Sample Tracker</h2>
      <nav className="space-y-2">
        <Link to="/dashboard" className="block hover:bg-gray-700 p-2 rounded">Dashboard</Link>
        <Link to="/samples" className="block hover:bg-gray-700 p-2 rounded">Samples</Link>
        <Link to="/samples/create" className="block hover:bg-gray-700 p-2 rounded">Create Sample</Link>
        <Link to="/patients" className="block hover:bg-gray-700 p-2 rounded">Patients</Link>
        <Link to="/test-types" className="block hover:bg-gray-700 p-2 rounded">Test Types</Link>
        <Link to="/users" className="block hover:bg-gray-700 p-2 rounded">Users</Link>
      </nav>
    </div>
  );
}
