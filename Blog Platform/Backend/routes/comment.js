const router = require('express').Router();
const auth = require('../middleware/auth');

// Import comment controller 
const commentController = require('../controllers/commentController');

// Comment routes
router.post('/:postId', auth, commentController.createComment);
router.get('/:postId', commentController.getComments);
router.put('/:id', auth, commentController.updateComment);
router.delete('/:id', auth, commentController.deleteComment);
router.post('/:commentId/reply', auth, commentController.replyToComment);

module.exports = router;