const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    createComment,
    getCommentsByBlog,
    updateComment,
    deleteComment
} = require('../controllers/commentController');

router.post('/blog/:blogId', auth, createComment);
router.get('/blog/:blogId', getCommentsByBlog);
router.put('/:commentId', auth, updateComment);
router.delete('/:commentId', auth, deleteComment); 

module.exports = router;