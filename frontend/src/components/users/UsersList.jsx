// src/pages/UserList.jsx
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllUsers } from '../../services/userService';
import LoadingSpinner from '../LoadingSpinner';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllUsers().then((data) => {
      setUsers(data.results || [])
      console.log("user: ", data.results )
      setLoading(false);
    });
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">User List</h2>
      <div className='py-4'>
        <Link to={`/create-user`} 
        className='bg-blue-600 text-white my-4 p-2 rounded hover:bg-blue-700'
        type='button'
      >
        Add User
      </Link>
      </div>
      <ul className="space-y-2">
        {users.map(user => (
          <li key={user.id} 
            className="flex justify-between items-center border p-2 rounded hover:bg-gray-100">
            <Link to={`/users/${user.id}`} 
              className="text-blue-600 hover:underline"
            >
              <strong>{user.username}</strong> - ({user.email}) 
            </Link>
            <span className='text-gray-500'>
              <strong>{user.role}</strong>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
