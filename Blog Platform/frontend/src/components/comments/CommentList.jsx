import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";

function CommentList({ blogId }) {
  const [comments, setComments] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await api.get(`/comments/blog/${blogId}`);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [blogId]);

  const handleDelete = async (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
        try {
            const response = await api.delete(`/comments/${commentId}`);
            if (response.status === 200) {
                setComments(comments.filter(comment => comment._id !== commentId));
            }
        } catch (error) {
            console.error('Error details:', error.response?.data);
            console.error('Error deleting comment:', error);
        }
    }
};

const handleEdit = async (commentId, newContent) => {
  try {
      const response = await api.put(`/comments/${commentId}`, { content: newContent });
      if (response.data) {
          setComments(comments.map(comment => 
              comment._id === commentId ? response.data : comment
          ));
      }
  } catch (error) {
      console.error('Error updating comment:', error);
  }
};

  return (
    <div className="comments-section">
      <h3>Comments</h3>
      {comments.length === 0 ? (
        <p>No comments yet</p>
      ) : (
        <div className="comments-list">
          {comments.map((comment) => (
            <div key={comment._id} className="comment">
              <p className="comment-content">{comment.content}</p>
              <p className="comment-author">By {comment.user.username}</p>
              <p className="comment-date">
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
              {user && user.id === comment.user._id && (
                <div className="comment-actions">
                  <button
                    onClick={() => {
                      const newContent = prompt(
                        "Edit your comment:",
                        comment.content
                      );
                      if (newContent) handleEdit(comment._id, newContent);
                    }}
                    className="edit-comment-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(comment._id)}
                    className="delete-comment-btn"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentList;
