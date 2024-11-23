import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import api from '../../utils/api';

function CommentForm({ blogId, onCommentAdded }) {
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
      if (onCommentAdded) {
        onCommentAdded(response.data);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleLoginClick = () => {
    navigate('/login', { state: { from: `/blog/${blogId}` } });
  };
  

  return (
    <div className="comment-form">
      <h3>Add a Comment</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your comment..."
          disabled={!isAuthenticated}
          className={!isAuthenticated ? 'disabled-textarea' : ''}
        />
        {isAuthenticated ? (
          <button type="submit">Post Comment</button>
        ) : (
          <button type="button" onClick={handleLoginClick}>
            Login to Comment
          </button>
        )}
      </form>
    </div>
  );
}

export default CommentForm;
