import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="p-4 bg-blue-500 text-white flex justify-between">
      <h1 className="text-xl font-bold">CarShop</h1>
      <ul className="flex space-x-4">
        <li><Link to="/">Home</Link></li>
        {user && user.role === 1 && <li><Link to="/customer">Cars</Link></li>}
        {user && user.role === 0 && <li><Link to="/admin">Admin</Link></li>}
        {!user ? (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        ) : (
          <li><button onClick={onLogout}>Logout</button></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;