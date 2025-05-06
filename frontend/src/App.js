import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import CarList from './components/CarList';
import CommentList from './components/CommentList';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import CarManager from './components/CarManager';
import Cart from './components/Cart'; // Import the Cart component

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const loggedInUser = JSON.parse(localStorage.getItem('user'));
      if (loggedInUser) {
        setUser(loggedInUser);
      }
    } catch (error) {
      console.error('Failed to parse user data from localStorage:', error);
      localStorage.removeItem('user'); // Clear invalid data
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <div className="App">
        <Navbar user={user} onLogout={handleLogout} />
        <div className="p-4">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Home />
                  <CarList user={user} /> {/* Pass the user prop */}
                </>
              }
            />
            <Route
              path="/customer"
              element={
                user && user.role === 1 ? (
                  <>
                    <CarList user={user} /> {/* Pass the user prop */}
                  </>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/admin"
              element={
                user && user.role === 0 ? (
                  <>
                    <CarManager />
                    <CommentList />
                  </>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/cart"
              element={
                user ? (
                  <Cart /> // Add the Cart component here
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignupForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
