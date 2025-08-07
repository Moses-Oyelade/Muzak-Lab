import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex space-x-4">
      <Link to="/" className="font-bold">Dashboard</Link>
      <Link to="/samples">Samples</Link>
      <Link to="/patients">Patients</Link>
      <Link to="/test-types">Test Types</Link>
    </nav>
  );
};

export default Header;
