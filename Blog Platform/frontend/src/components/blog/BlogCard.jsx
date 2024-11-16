import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const BlogCard = ({ post }) => {
  const { user } = useAuth();
  const isAuthor = user?._id === post.author._id;

  // Function to truncate text to a certain length
  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength).trim() + '...';
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="blog-card">
      <div className="blog-card-header">
        <Link to={`/blog/${post._id}`} className="blog-title">
          <h2>{post.title}</h2>
        </Link>
        <div className="blog-meta">
          <span className="author">By {post.author.name}</span>
          <span className="date">{formatDate(post.createdAt)}</span>
        </div>
      </div>

      <div className="blog-preview">
        <p>{truncateText(post.content)}</p>
      </div>

      <div className="blog-card-footer">
        <Link to={`/blog/${post._id}`} className="read-more">
          Read More
        </Link>
        {isAuthor && (
          <div className="author-actions">
            <Link to={`/blog/edit/${post._id}`} className="edit-button">
              Edit
            </Link>
          </div>
        )}
        <div className="blog-stats">
          <span className="comments-count">
            {post.comments?.length || 0} Comments
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;