import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../utils/api";
import CommentForm from "./CommentForm";

function CommentList({ blogId }) {
  const [comments, setComments] = useState([]);
  const { user } = useContext(AuthContext);

  const handleCommentAdded = (newComment) => {
    setComments([...comments, newComment]);
  };

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
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        const response = await api.delete(`/comments/${commentId}`);
        if (response.status === 200) {
          setComments(comments.filter((comment) => comment._id !== commentId));
        }
      } catch (error) {
        console.error("Error details:", error.response?.data);
        console.error("Error deleting comment:", error);
      }
    }
  };

  const handleEdit = async (commentId, newContent) => {
    try {
      const response = await api.put(`/comments/${commentId}`, {
        content: newContent,
      });
      if (response.data) {
        setComments(
          comments.map((comment) =>
            comment._id === commentId ? response.data : comment
          )
        );
      }
    } catch (error) {
      console.error("Error updating comment:", error);
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
              <p className="comment-content">{comment.content}</p>
              <div className="comment-metadata-line">
                <span className="comment-date">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
                <span className="comment-author">
                  By {comment.user.username}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
      <CommentForm blogId={blogId} onCommentAdded={handleCommentAdded} />
    </div>
  );
}
export default CommentList;
