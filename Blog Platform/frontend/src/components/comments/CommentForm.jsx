import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import api from '../../utils/api';

function CommentForm({ blogId }) {
  const [content, setContent] = useState('');
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    try {
      const response = await api.post(`/comments/blog/${blogId}`, { content });
      setContent('');
      window.location.reload(); // Refresh comments
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="comment-form">
      <h3>Add a Comment</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={isAuthenticated ? "Write your comment..." : "Please login to comment"}
          disabled={!isAuthenticated}
        />
        <button type="submit" disabled={!isAuthenticated}>
          {isAuthenticated ? "Post Comment" : "Login to Comment"}
        </button>
      </form>
    </div>
  );
}

export default CommentForm;
