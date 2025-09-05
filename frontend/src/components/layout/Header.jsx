import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const location = useLocation();
  
  

  const handleLogout = () => {
    logout();
    navigate("/");
  }

  return (
    <>
    {user && (
        <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <div>
            { location.pathname === '/' ? (
              <div className="font-bold text-2xl">🔬Home</div>
            ) : (
              <Link to="/" className="font-bold text-2xl hover:text-slate-400">🔬 Dashboard</Link>
            )
            }
          </div>
          <div className='space-x-8 drop-shadow-sm items- justify-between'>
            <Link 
              to="/result-tracker" 
              className='hover:text-lg hover:text-black hover:underline'
            >
              Track Result
            </Link>
              <Link to="/patients" className='hover:text-lg hover:text-black hover:underline'>Patients</Link>
              <button
                onClick={handleLogout}
                className='hover:text-lg hover:rounded hover:px-1 hover:bg-red-600'
              >
                Logout
              </button>
          </div>
        </nav>
      )}
    </>
  );
};

export default Header;
