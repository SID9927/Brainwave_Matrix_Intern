import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">BlogMatrix</Link>
      </div>
      <div className="nav-links">
        <Link to="/blog">Blogs</Link>
        {user ? (
          <>
            <Link to="/blog/new" className="create-post-btn">Create Post</Link>
            <div className="user-menu">
              {user.profilePicture && (
                <img 
                  src={user.profilePicture} 
                  alt={user.username} 
                  className="profile-picture"
                />
              )}
              <span>Welcome, {user.username}</span>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </>
        ) : (
          <div className="auth-links">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;