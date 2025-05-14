import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import '../App.css';

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();         // Logout logic from props
    navigate('/');      // Redirect to homepage
  };

  return (
    <nav className="p-4 bg-blue-500 text-white flex justify-between ">
      <Link to="/" className="text-xl font-bold no-underline">
        CarShop
      </Link>
      <ul className="flex space-x-4">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/car">Cars</Link></li>
        {user && user.role === 1 && <li><Link to="/cart">Order</Link></li>}
        {user && user.role === 1 && <li><Link to="/about">About Us</Link></li> }
        {user && user.role === 1 && <li><Link to="/contact">Contact Us</Link></li> }
        {user && user.role === 0 && <li><Link to="/admin">Admin</Link></li>}
        
        {!user ? (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        ) : (
          <li><button onClick={handleLogout}>Logout</button></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
