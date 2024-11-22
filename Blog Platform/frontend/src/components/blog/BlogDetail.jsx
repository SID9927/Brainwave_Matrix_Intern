import { useState, useEffect, useContext, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import CommentList from '../comments/CommentList';
import CommentForm from '../comments/CommentForm';
import api from '../../utils/api';

function BlogDetail() {
    const [blog, setBlog] = useState(null);
    const { id } = useParams();
    const { isAuthenticated, user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await api.get(`/blogs/${id}`);
                setBlog(response.data);
                console.log('Blog Author ID:', response.data.author._id);
                console.log('Current User ID:', user?.id);
            } catch (error) {
                console.error('Error fetching blog:', error);
            }
        };
        fetchBlog();
    }, [id]);

    const isAuthor = useMemo(() => {
        return isAuthenticated && 
               user?.id && 
               blog?.author?._id && 
               blog.author._id === user.id;
    }, [isAuthenticated, user, blog]);

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this blog?');
        if (confirmDelete) {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        'x-auth-token': token
                    }
                };
                const response = await api.delete(`/blogs/${id}`, config);
                if (response.status === 200) {
                    navigate('/');
                }
            } catch (error) {
                console.error('Delete error details:', error.response?.data || error.message);
            }
        }
    };

    if (!blog) return <div>Loading...</div>;

    return (
        <div className="blog-detail">
        {isAuthor && (
            <div className="blog-actions">
                <Link to={`/blog/edit/${blog._id}`} className="edit-blog-btn">
                    Edit
                </Link>
                <button onClick={handleDelete} className="delete-blog-btn">
                    Delete
                </button>
            </div>
        )}
        <h1>{blog.title}</h1>
        <p className="author">By {blog.author.username}</p>
        <div className="content" style={{ whiteSpace: 'pre-wrap' }}>{blog.content}</div>
        
        <div className="comments-section">
            <CommentList blogId={id} />
            {isAuthenticated ? (
                <CommentForm blogId={id} />
            ) : (
                <div className="login-prompt">
                    <p>Please <Link to="/login">login</Link> to comment on this blog</p>
                </div>
            )}
        </div>
    </div>
    );
}

export default BlogDetail;
