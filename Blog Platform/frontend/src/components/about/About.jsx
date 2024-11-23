import { FaLinkedin, FaGlobe, FaEnvelope } from "react-icons/fa";
import "./about.css";

function About() {
  return (
    <div className="about-section">
      <h2>About Blog Platform</h2>

      <div className="platform-info">
        <section className="info-block">
          <h3>What is Blog Platform?</h3>
          <p>
            Blog Platform is a modern, user-friendly space for writers,
            thinkers, and creators to share their stories, knowledge, and
            experiences with the world. Built with the MERN stack, it offers a
            seamless writing and reading experience.
          </p>
        </section>

        <section className="info-block">
          <h3>Why Choose Our Platform?</h3>
          <ul>
            <li>Simple and intuitive interface</li>
            <li>Real-time commenting system</li>
            <li>Secure user authentication</li>
            <li>Responsive design for all devices</li>
            <li>Free to use and easy to get started</li>
          </ul>
        </section>

        <section className="info-block">
          <h3>Who Uses Blog Platform?</h3>
          <div className="user-types">
            <div className="user-type">
              <h4>Writers</h4>
              <p>Share your stories, poems, and creative writing</p>
            </div>
            <div className="user-type">
              <h4>Professionals</h4>
              <p>Share industry insights and expertise</p>
            </div>
            <div className="user-type">
              <h4>Educators</h4>
              <p>Share educational content and resources</p>
            </div>
          </div>
        </section>

        <section className="info-block">
          <h3>How It Works</h3>
          <div className="how-it-works">
            <div className="step">
              <h4>1. Create Account</h4>
              <p>Sign up with your email and start your journey</p>
            </div>
            <div className="step">
              <h4>2. Write & Publish</h4>
              <p>Create your blog posts with our easy-to-use editor</p>
            </div>
            <div className="step">
              <h4>3. Engage & Connect</h4>
              <p>Interact with readers through comments and discussions</p>
            </div>
          </div>
        </section>

        <section className="info-block">
          <h3>Technology Stack</h3>
          <div className="tech-stack">
            <p>Frontend: React.js, Modern CSS</p>
            <p>Backend: Node.js, Express.js</p>
            <p>Database: MongoDB</p>
            <p>Authentication: JWT</p>
          </div>
        </section>
      </div>

      <div className="developer-info">
        <div className="profile-info">
          <div className="profile-text">
            <h4>Siddharth</h4>
            <p>Full Stack Developer | MERN Stack | Web Development | Java Developer</p>
            <p className="email">5065sid@gmail.com</p>
          </div>
          <div className="social-links">
            <a
              href="https://www.linkedin.com/in/siddharth-in/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-button"
            >
              LinkedIn
            </a>
            <a
              href="https://siddharth-portfolio-web.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-button"
            >
              Portfolio
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
