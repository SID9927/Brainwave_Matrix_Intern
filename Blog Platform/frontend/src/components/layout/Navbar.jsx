import { useContext, useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    // If on login, register, or create blog page, navigate to home
    if (["/login", "/register", "/blog/create"].includes(location.pathname)) {
      navigate("/");
    }
    // Otherwise stay on current page
    setShowDropdown(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">Blog Platform</Link>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link">
          Home
        </Link>
        {isAuthenticated && (
          <>
            <Link to="/blog/create" className="nav-link create-blog-link">
              Create Blog
            </Link>
            <div className="user-dropdown" ref={dropdownRef}>
              <span
                className="username"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {user?.username}
              </span>
              {showDropdown && (
                <div className="dropdown-menu">
                  <Link to="/my-blogs" className="dropdown-item">
                    My Blogs
                  </Link>
                  <button className="dropdown-item" onClick={handleLogout} >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        )}
        {!isAuthenticated && (
          <>
            <Link to="/login" state={{ from: "/" }} className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
