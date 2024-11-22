const Comment = require('../models/Comment');
const Blog = require('../models/Blog');

exports.createComment = async (req, res) => {
    try {
        const { content } = req.body;
        const blogId = req.params.blogId;

        // Verify blog exists
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        const comment = new Comment({
            content,
            blog: blogId,
            user: req.user.id
        });

        await comment.save();

        const populatedComment = await Comment.findById(comment._id)
            .populate('user', 'username')
            .populate('blog', 'title');

        res.json(populatedComment);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getCommentsByBlog = async (req, res) => {
    try {
        const comments = await Comment.find({ blog: req.params.blogId })
            .populate('user', 'username')
            .sort({ createdAt: -1 });
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateComment = async (req, res) => {
    try {
        const { content } = req.body;
        let comment = await Comment.findById(req.params.commentId);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        comment.content = content;
        await comment.save();

        const updatedComment = await Comment.findById(comment._id)
            .populate('user', 'username')
            .populate('blog', 'title');

        res.json(updatedComment);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await Comment.findByIdAndDelete(req.params.commentId);
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (err) {
        console.error('Delete Comment Error:', err); // Log the error
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

