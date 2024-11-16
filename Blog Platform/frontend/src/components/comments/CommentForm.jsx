import React, { useState } from 'react';
import { blogApi } from '../../utils/api';
import { useAuth } from '../../contexts/AuthContext';

const CommentForm = ({ postId, onCommentAdded }) => {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await blogApi.addComment(postId, { content });
      setContent('');
      onCommentAdded();
    } catch (err) {
      setError('Failed to add comment');
    }
  };

  if (!user) {
    return <p>Please login to comment</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your comment..."
        required
      />
      {error && <div className="error-message">{error}</div>}
      <button type="submit">Post Comment</button>
    </form>
  );
};

export default CommentForm;