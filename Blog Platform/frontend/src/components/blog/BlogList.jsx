import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import BlogCard from './BlogCard';
import api from '../../utils/api';

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const { isAuthenticated, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get('/blogs');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  // const handleCreateBlog = () => {
  //   if (!isAuthenticated) {
  //     navigate('/login');
  //   } else {
  //     navigate('/blog/create');
  //   }
  // };

  return (
    <div className="blog-list">
      <h2>Latest Blogs</h2>
      <div className="blogs-grid">
      {blogs.map(blog => (
          <BlogCard 
            key={blog._id} 
            blog={blog} 
            isAuthor={isAuthenticated && user?.id === blog.author._id}
          />
        ))}
      </div>
    </div>
  );
}

export default BlogList;
