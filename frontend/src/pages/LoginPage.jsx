import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(username, password);
    console.log('User Credentials: ', success)
    if (!success) {
      setError('Invalid credentials');
    } else {
      setError('');
      // Redirect to dashboard or home page
      window.location.href = '/result-tracker';
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen ">
      <h2 className='text-2xl font-bold p-4'>Login</h2>
      <form 
        onSubmit={handleSubmit}
        className="max-w-sm w-full bg-gray-300 p-6 rounded shadow-lg"
      >
        <input
          type="text"
          value={username}
          className="w-full p-2 my-1 border rounded"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          className="w-full p-2 my-1 border rounded"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button 
          type="submit"
          className="w-full bg-blue-500 text-white py-2 mt-3 rounded hover:bg-blue-600"
        >
          Login
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
