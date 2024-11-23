import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import BlogCard from './BlogCard';
import api from '../../utils/api';

function MyBlogs() {
  const [blogs, setBlogs] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const response = await api.get('/blogs');
        // Filter blogs where the author ID matches the logged-in user's ID
        const myBlogs = response.data.filter(blog => blog.author._id === user.id);
        setBlogs(myBlogs);
      } catch (error) {
        console.error('Error fetching my blogs:', error);
      }
    };

    if (user) {
      fetchMyBlogs();
    }
  }, [user]);

  return (
    <div className="blog-list">
      <h2>My Blogs</h2>
      {blogs.length === 0 ? (
        <p>You haven't created any blogs yet.</p>
      ) : (
        <div className="blogs-grid">
          {blogs.map(blog => (
            <BlogCard 
              key={blog._id} 
              blog={blog} 
              isAuthor={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBlogs;
