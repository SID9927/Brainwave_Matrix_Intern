import React, { useState, useEffect } from 'react';
import { blogApi } from '../../utils/api';
import BlogCard from './BlogCard';
import Loading from '../common/Loading';

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await blogApi.getAllPosts();
      setPosts(Array.isArray(response.data) ? response.data : response.data.posts || []);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to fetch posts');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <div className="error-message">{error}</div>;
  if (!Array.isArray(posts)) return <div className="error-message">Invalid data format</div>;
  if (posts.length === 0) return <div className="no-posts">No posts found</div>;

  return (
    <div className="blog-list">
      {posts.map(post => (
        <BlogCard key={post._id || post.id} post={post} />
      ))}
    </div>
  );
};

export default BlogList;