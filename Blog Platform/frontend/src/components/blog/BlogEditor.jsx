import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { blogApi } from '../../utils/api';
import { useAuth } from '../../contexts/AuthContext';

const BlogEditor = ({ post, isEditing }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: post?.title || '',
    content: post?.content || '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await blogApi.updatePost(post._id, formData);
      } else {
        await blogApi.createPost(formData);
      }
      navigate('/blog');
    } catch (err) {
      setError('Failed to save post');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="blog-editor">
      <input
        type="text"
        value={formData.title}
        onChange={(e) => setFormData({...formData, title: e.target.value})}
        placeholder="Post Title"
        required
      />
      <textarea
        value={formData.content}
        onChange={(e) => setFormData({...formData, content: e.target.value})}
        placeholder="Write your post content here..."
        required
      />
      {error && <div className="error-message">{error}</div>}
      <button type="submit">{isEditing ? 'Update Post' : 'Create Post'}</button>
    </form>
  );
};

export default BlogEditor;