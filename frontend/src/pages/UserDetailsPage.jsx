// src/pages/UserDetails.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import  getUserById  from '../services/userService';

const UserDetails = () => {
  const { id } = useParams();  // ✅ Extract ID from URL
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserById(id).then(setUser);
  }, [id]);

  if (!user) return <div>Loading user...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">User Details</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>ID:</strong> {user._id}</p>
      <p><strong>Email:</strong> {user.email}</p>
      {/* Add more fields as needed */}
    </div>
  );
};

export default UserDetails;
