const Blog = require('../models/Blog');
const Comment = require('../models/Comment');

exports.createBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const blog = new Blog({
            title,
            content,
            author: req.user.id
        });
        await blog.save();
        res.json(blog);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'username');
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('author', 'username');
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json(blog);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateBlog = async (req, res) => {
    try {
        let blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        
        if (blog.author.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        blog = await Blog.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.json(blog);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        if (blog.author.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        // Delete comments associated with the blog
        await Comment.deleteMany({ blog: req.params.id });
        // Then delete the blog
        await Blog.findByIdAndDelete(req.params.id);

        return res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        console.error('Delete Blog Error:', error); // Log the error
        console.error('Stack Trace:', error.stack); // Log the stack trace for more context
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};