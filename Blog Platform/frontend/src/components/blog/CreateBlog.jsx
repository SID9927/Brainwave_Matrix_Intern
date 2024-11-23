import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

function CreateBlog() {
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false
  });
  const contentRef = useRef(null);
  const navigate = useNavigate();

  const handleFormat = (command) => {
    document.execCommand(command, false, null);
    setActiveFormats(prev => ({
      ...prev,
      [command]: !prev[command]
    }));
    contentRef.current.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/blogs', {
        ...formData,
        content: contentRef.current.innerHTML
      });
      navigate(`/blog/${response.data._id}`);
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  return (
    <div className="create-blog">
  <h2>Create New Blog Post</h2>
  <form onSubmit={handleSubmit}>
    <div className="form-group" style={{ position: 'relative' }}>
      <input
        type="text"
        placeholder="Blog Title"
        value={formData.title}
        onChange={(e) => setFormData({...formData, title: e.target.value})}
        required
      />
      <div className="formatting-tools">
        <button 
          type="button" 
          onClick={() => handleFormat('bold')} 
          className={`format-btn ${activeFormats.bold ? 'active' : ''}`}
        >
          B
        </button>
        <button 
          type="button" 
          onClick={() => handleFormat('italic')} 
          className={`format-btn ${activeFormats.italic ? 'active' : ''}`}
        >
          I
        </button>
        <button 
          type="button" 
          onClick={() => handleFormat('underline')} 
          className={`format-btn ${activeFormats.underline ? 'active' : ''}`}
        >
          U
        </button>
      </div>
    </div>

        <div className="form-group">
          <div
            ref={contentRef}
            className="rich-text-editor"
            contentEditable="true"
            placeholder="Blog Content"
            onInput={(e) => setFormData({...formData, content: e.currentTarget.innerHTML})}
          />
        </div>
        <button type="submit">Publish Blog</button>
      </form>
    </div>
  );
}

export default CreateBlog;
