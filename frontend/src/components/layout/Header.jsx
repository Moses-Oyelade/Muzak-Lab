import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div>
        <Link to="/" className="font-bold text-2xl hover:text-slate-400">Dashboard</Link>
      </div>
      <div className='space-x-8 drop-shadow-sm items- justify-between'>
        <Link to="/result-tracker" className='hover:text-lg hover:text-black hover:underline'>Track Result</Link>
        <Link to="/patients" className='hover:text-lg hover:text-black hover:underline'>Patients</Link>
        <Link to="/login" className='hover:text-lg hover:text-black hover:underline'>Login</Link>
      </div>
    </nav>
  );
};

export default Header;
