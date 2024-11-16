import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { blogApi } from '../../utils/api';

const CommentList = ({ comments, postId, onCommentDeleted }) => {
  const { user } = useAuth();

  const handleDelete = async (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await blogApi.deleteComment(postId, commentId);
        onCommentDeleted();
      } catch (err) {
        console.error('Failed to delete comment');
      }
    }
  };

  return (
    <div className="comments-list">
      {comments.map(comment => (
        <div key={comment._id} className="comment">
          <div className="comment-header">
            <span className="comment-author">{comment.author.name}</span>
            <span className="comment-date">
              {new Date(comment.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className="comment-content">{comment.content}</p>
          {user?._id === comment.author._id && (
            <button 
              onClick={() => handleDelete(comment._id)}
              className="delete-comment-btn"
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentList;