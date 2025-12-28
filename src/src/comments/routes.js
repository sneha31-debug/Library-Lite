const express = require('express');
const {
    createPostComment,
    getPostComments,
    deletePostComment
} = require('./controllers');
const { auth } = require('../middlewares/auth');

const router = express.Router();

router.post('/post/:postId', auth, createPostComment);
router.get('/post/:postId', getPostComments);
router.delete('/:commentId', auth, deletePostComment);

module.exports = router;
