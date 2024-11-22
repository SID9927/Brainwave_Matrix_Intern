import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import api from '../../utils/api';

function EditBlog() {
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await api.get(`/blogs/${id}`);
        if (response.data.author._id !== user?.id) {
          navigate('/');
          return;
        }
        setFormData({
          title: response.data.title,
          content: response.data.content
        });
      } catch (error) {
        console.error('Error fetching blog:', error);
        navigate('/');
      }
    };
    fetchBlog();
  }, [id, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/blogs/${id}`, formData);
      navigate(`/blog/${id}`);
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  return (
    <div className="edit-blog">
      <h2>Edit Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({...formData, content: e.target.value})}
            rows="10"
            required
          />
        </div>
        <button type="submit" className="edit-button">Update Blog</button>
      </form>
    </div>
  );
}

export default EditBlog;
