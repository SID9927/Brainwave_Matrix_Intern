import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogApi } from '../../utils/api';
import { useAuth } from '../../contexts/AuthContext';
import CommentList from '../comments/CommentList';
import CommentForm from '../comments/CommentForm';
import Loading from '../common/Loading';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await blogApi.getPost(id);
      setPost(response.data);
    } catch (err) {
      setError('Failed to fetch post');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await blogApi.deletePost(id);
        navigate('/blog');
      } catch (err) {
        setError('Failed to delete post');
      }
    }
  };

  if (loading) return <Loading />;
  if (error) return <div className="error-message">{error}</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <div className="blog-post">
      <h1>{post.title}</h1>
      <div className="post-meta">
        <span>By {post.author.name}</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
      
      <div className="post-content">{post.content}</div>
      
      {user?._id === post.author._id && (
        <div className="post-actions">
          <button onClick={() => navigate(`/blog/edit/${id}`)}>Edit</button>
          <button onClick={handleDelete} className="delete-btn">Delete</button>
        </div>
      )}

      <div className="comments-section">
        <h2>Comments</h2>
        <CommentForm postId={id} onCommentAdded={fetchPost} />
        <CommentList comments={post.comments} postId={id} onCommentDeleted={fetchPost} />
      </div>
    </div>
  );
};

export default BlogPost;