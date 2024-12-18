import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function BlogCard({ blog }) {
  const { user } = useContext(AuthContext);
  const isAuthor = user && user.id === blog.author._id;

  const getTextPreview = (htmlContent) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    const textContent = tempDiv.textContent || tempDiv.innerText;
    return textContent.substring(0, 150);
  };

  return (
    <div className="blog-card">
      <h3>{blog.title}</h3>
      <p className="preview">{getTextPreview(blog.content)}...</p>
      <div className="blog-card-footer">
        <Link to={`/blog/${blog._id}`} className="read-more">
          Read More
        </Link>
      </div>
      <p className="author">By {blog.author.username}</p>
    </div>
  );
}

export default BlogCard;
