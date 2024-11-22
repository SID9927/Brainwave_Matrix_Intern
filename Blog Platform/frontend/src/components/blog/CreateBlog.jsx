import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

function CreateBlog() {
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/blogs', formData);
      navigate(`/blog/${response.data._id}`);
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  return (
    <div className="create-blog">
      <h2>Create New Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Blog Title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Blog Content"
            value={formData.content}
            onChange={(e) => setFormData({...formData, content: e.target.value})}
            rows="10"
            required
          />
        </div>
        <button type="submit">Publish Blog</button>
      </form>
    </div>
  );
}

export default CreateBlog;
