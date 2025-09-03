// import React from 'react'
// import { Link } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext'

// export default function Nav() {
//     const { logout } = useAuth();

//     const handleLogout = async () => {
//         await logout();
//         window.location.href = '/';
//     }


//   return (
//     <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
//       <div>
//         <Link to="/" className="font-bold text-2xl hover:text-slate-400">Dashboard</Link>
//       </div>
//       <div className='space-x-8 drop-shadow-sm items- justify-between'>
//         <Link to="/result-tracker" className='hover:text-lg hover:text-black hover:underline'>Track Result</Link>
//         <Link to="/patients" className='hover:text-lg hover:text-black hover:underline'>Patients</Link>
//         <button 
//             onClick={handleLogout}
//             className='hover:text-lg hover:rounded hover:px-1 hover:bg-red-600'
//         >
//             Logout
//         </button>
//       </div>
//     </nav>
//   )
// }
