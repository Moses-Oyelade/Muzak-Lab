// src/pages/UserDetails.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import  { deleteUser, getUserById }  from '../services/userService';
import LoadingSpinner from '../components/LoadingSpinner';

const UserDetailsPage = () => {
  const { id } = useParams();  // ✅ Extract ID from URL
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserById(id).then(data => {
      setUser(data);
      console.log('Single user:' , data)
      setLoading(false)
    });
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      await deleteUser(id);
      alert('delete successfully')
      navigate("/users");
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!user) return <p className='p-4 text-red-500'> User not found!</p>

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-2">User Details</h2>
      <div className="bg-white shadow p-4 rounded space-y-2">
        <p><strong>Name:</strong> {user.username}</p>
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        {/* Add more fields as needed */}
      </div>

      <div className="mt-4 flex gap-4">
        <button
          onClick={() => navigate(`/users/${id}/edit`)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserDetailsPage;
