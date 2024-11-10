const Comment = require('../model/Comment');
const Post = require('../model/Post');

exports.createComment = async (req, res) => {
  try {
    const { content } = req.body;
    const postId = req.params.postId;

    const newComment = new Comment({
      content,
      author: req.user.id,
      post: postId
    });

    const savedComment = await newComment.save();
    
    // Add comment to post's comments array
    await Post.findByIdAndUpdate(postId, {
      $push: { comments: savedComment._id }
    });

    await savedComment.populate('author', 'username');
    
    res.status(201).json(savedComment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate('author', 'username')
      .populate({
        path: 'replies',
        populate: { path: 'author', select: 'username' }
      })
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if user is the author
    if (comment.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'User not authorized' });
    }

    comment.content = req.body.content;
    await comment.save();
    
    await comment.populate('author', 'username');

    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if user is the author
    if (comment.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'User not authorized' });
    }

    // Remove comment from post's comments array
    await Post.findByIdAndUpdate(comment.post, {
      $pull: { comments: comment._id }
    });

    await comment.deleteOne();
    res.json({ message: 'Comment removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.replyToComment = async (req, res) => {
  try {
    const { content } = req.body;
    const parentComment = await Comment.findById(req.params.commentId);

    if (!parentComment) {
      return res.status(404).json({ message: 'Parent comment not found' });
    }

    const reply = new Comment({
      content,
      author: req.user.id,
      post: parentComment.post,
      parentComment: parentComment._id
    });

    const savedReply = await reply.save();
    
    // Add reply to parent comment's replies array
    parentComment.replies.push(savedReply._id);
    await parentComment.save();

    await savedReply.populate('author', 'username');
    
    res.status(201).json(savedReply);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};