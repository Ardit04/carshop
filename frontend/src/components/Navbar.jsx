import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // shto useNavigate
import '../App.css';

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();         // logout logjika që vjen nga props
    navigate('/');      // redirect në homepage
  };

  return (
    <nav className="p-4 bg-blue-500 text-white flex justify-between">
      <Link to="/" className="text-xl font-bold no-underline">
        CarShop
      </Link>
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
          <li><button onClick={handleLogout}>Logout</button></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
