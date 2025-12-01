const express = require('express');
const {
    createPost,
    getFeedPosts,
    getUserPosts,
    likePost,
    unlikePost,
    deletePost
} = require('./controllers');
const { auth, optionalAuth } = require('../middlewares/auth');

const router = express.Router();

router.post('/', auth, createPost);
router.get('/feed', optionalAuth, getFeedPosts);
router.get('/user/:userId', getUserPosts);
router.post('/:postId/like', auth, likePost);
router.delete('/:postId/like', auth, unlikePost);
router.delete('/:postId', auth, deletePost);

module.exports = router;
