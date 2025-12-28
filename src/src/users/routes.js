const express = require('express');
const {
    getUserProfile,
    updateProfile,
    followUser,
    unfollowUser,
    getFollowers,
    getFollowing
} = require('./controllers');
const { auth } = require('../middlewares/auth');

const router = express.Router();

router.get('/:userId', getUserProfile);
router.put('/profile', auth, updateProfile);
router.post('/:userId/follow', auth, followUser);
router.delete('/:userId/follow', auth, unfollowUser);
router.get('/:userId/followers', getFollowers);
router.get('/:userId/following', getFollowing);

module.exports = router;
