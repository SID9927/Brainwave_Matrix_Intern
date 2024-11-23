import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import BlogList from './components/blog/BlogList';
import BlogDetail from './components/blog/BlogDetail';
import MyBlogs from './components/blog/MyBlogs';
import CreateBlog from './components/blog/CreateBlog';
import EditBlog from './components/blog/EditBlog';
import { AuthProvider } from './context/AuthContext';
import './components/styles/components.css';
import About from './components/about/About';




function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="container">
            <Routes>
              <Route path="/" element={<BlogList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/blog/create" element={<CreateBlog />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/blog/edit/:id" element={<EditBlog />} />
              <Route path="/my-blogs" element={<MyBlogs />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
          <Footer />
          <ScrollToTop />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
