const { prisma } = require('../../db/config');

const getUserProfile = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await prisma.user.findUnique({
            where: { id: parseInt(userId) },
            select: {
                id: true,
                email: true,
                username: true,
                fullName: true,
                bio: true,
                profilePicture: true,
                createdAt: true,
                _count: {
                    select: {
                        posts: true,
                        books: true,
                        ratings: true,
                        followers: true,
                        following: true
                    }
                }
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ user });
    } catch (error) {
        console.error('Get user profile error:', error);
        res.status(500).json({ error: 'Failed to get user profile' });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { fullName, bio, profilePicture } = req.body;

        const user = await prisma.user.update({
            where: { id: req.userId },
            data: {
                ...(fullName && { fullName }),
                ...(bio !== undefined && { bio }),
                ...(profilePicture && { profilePicture })
            },
            select: {
                id: true,
                email: true,
                username: true,
                fullName: true,
                bio: true,
                profilePicture: true,
                createdAt: true
            }
        });

        res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ error: 'Failed to update profile' });
    }
};

const followUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const followingId = parseInt(userId);

        if (followingId === req.userId) {
            return res.status(400).json({ error: 'Cannot follow yourself' });
        }

        const existingFollow = await prisma.follow.findUnique({
            where: {
                followerId_followingId: {
                    followerId: req.userId,
                    followingId
                }
            }
        });

        if (existingFollow) {
            return res.status(400).json({ error: 'Already following this user' });
        }

        await prisma.follow.create({
            data: {
                followerId: req.userId,
                followingId
            }
        });

        res.json({ message: 'User followed successfully' });
    } catch (error) {
        console.error('Follow user error:', error);
        res.status(500).json({ error: 'Failed to follow user' });
    }
};

const unfollowUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const followingId = parseInt(userId);

        await prisma.follow.delete({
            where: {
                followerId_followingId: {
                    followerId: req.userId,
                    followingId
                }
            }
        });

        res.json({ message: 'User unfollowed successfully' });
    } catch (error) {
        console.error('Unfollow user error:', error);
        res.status(500).json({ error: 'Failed to unfollow user' });
    }
};

const getFollowers = async (req, res) => {
    try {
        const { userId } = req.params;

        const followers = await prisma.follow.findMany({
            where: { followingId: parseInt(userId) },
            include: {
                follower: {
                    select: {
                        id: true,
                        username: true,
                        fullName: true,
                        profilePicture: true
                    }
                }
            }
        });

        res.json({ followers: followers.map(f => f.follower) });
    } catch (error) {
        console.error('Get followers error:', error);
        res.status(500).json({ error: 'Failed to get followers' });
    }
};

const getFollowing = async (req, res) => {
    try {
        const { userId } = req.params;

        const following = await prisma.follow.findMany({
            where: { followerId: parseInt(userId) },
            include: {
                following: {
                    select: {
                        id: true,
                        username: true,
                        fullName: true,
                        profilePicture: true
                    }
                }
            }
        });

        res.json({ following: following.map(f => f.following) });
    } catch (error) {
        console.error('Get following error:', error);
        res.status(500).json({ error: 'Failed to get following' });
    }
};

module.exports = {
    getUserProfile,
    updateProfile,
    followUser,
    unfollowUser,
    getFollowers,
    getFollowing
};
