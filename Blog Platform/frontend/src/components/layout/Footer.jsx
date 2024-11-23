import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function Footer() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Blog Platform</h3>
          <p>Share your stories with the world</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            {isAuthenticated && (
              <li><Link to="/my-blogs">My Blogs</Link></li>
            )}
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: 5065sid@gmail.com</p>
          <p>Follow us on social media</p>
          <div className="social-icons">
            <a href="https://www.linkedin.com/in/siddharth-in/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="social-icon" />
            </a>
            <a href="https://github.com/SID9927" target="_blank" rel="noopener noreferrer">
              <FaGithub className="social-icon" />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Blog Platform. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
