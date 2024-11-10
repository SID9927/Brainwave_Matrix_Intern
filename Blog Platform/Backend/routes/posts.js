const router = require('express').Router();
const postController = require('../controllers/postController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/', auth, upload.single('image'), postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.put('/:id', auth, upload.single('image'), postController.updatePost);
router.delete('/:id', auth, postController.deletePost);

module.exports = router;