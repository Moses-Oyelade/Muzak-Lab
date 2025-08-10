import React from 'react'

export default function Nav() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div>
        <Link to="/" className="font-bold text-lg">Dashboard</Link>
      </div>
      <div className='space-x-8 drop-shadow-sm items- justify-between'>
        <Link to="/result-tracker">Track Result</Link>
        <Link to="/patients">Patients</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  )
}
