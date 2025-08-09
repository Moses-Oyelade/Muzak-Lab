// src/pages/UserList.jsx
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getAllUsers  from '../../services/userService';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then(setUsers);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">User List</h2>
      <ul className="space-y-2">
        {users.map(user => (
          <li key={user._id} className="border p-2 rounded hover:bg-gray-100">
            <Link to={`/users/${user._id}`} className="text-blue-600 hover:underline">
              {user.name} (ID: {user._id})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
