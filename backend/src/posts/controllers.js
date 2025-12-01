const { prisma } = require('../../db/config');

const createPost = async (req, res) => {
    try {
        const { content, image } = req.body;

        if (!content || content.trim() === '') {
            return res.status(400).json({ error: 'Post content is required' });
        }

        const post = await prisma.post.create({
            data: {
                userId: req.userId,
                content,
                image: image || null
            },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        fullName: true,
                        profilePicture: true
                    }
                },
                _count: {
                    select: {
                        likes: true
                    }
                }
            }
        });

        res.status(201).json({ message: 'Post created successfully', post });
    } catch (error) {
        console.error('Create post error:', error);
        res.status(500).json({ error: 'Failed to create post' });
    }
};

const getFeedPosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const posts = await prisma.post.findMany({
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        fullName: true,
                        profilePicture: true
                    }
                },
                likes: {
                    where: req.userId ? { userId: req.userId } : undefined,
                    select: { userId: true }
                },
                _count: {
                    select: {
                        likes: true
                    }
                }
            }
        });

        const postsWithLikeStatus = posts.map(post => ({
            ...post,
            isLiked: post.likes.length > 0,
            likes: undefined
        }));

        res.json({ posts: postsWithLikeStatus });
    } catch (error) {
        console.error('Get feed posts error:', error);
        res.status(500).json({ error: 'Failed to get posts' });
    }
};

const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;

        const posts = await prisma.post.findMany({
            where: { userId: parseInt(userId) },
            orderBy: { createdAt: 'desc' },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        fullName: true,
                        profilePicture: true
                    }
                },
                _count: {
                    select: {
                        likes: true
                    }
                }
            }
        });

        res.json({ posts });
    } catch (error) {
        console.error('Get user posts error:', error);
        res.status(500).json({ error: 'Failed to get user posts' });
    }
};

const likePost = async (req, res) => {
    try {
        const { postId } = req.params;

        const existingLike = await prisma.postLike.findUnique({
            where: {
                userId_postId: {
                    userId: req.userId,
                    postId: parseInt(postId)
                }
            }
        });

        if (existingLike) {
            return res.status(400).json({ error: 'Post already liked' });
        }

        await prisma.postLike.create({
            data: {
                userId: req.userId,
                postId: parseInt(postId)
            }
        });

        res.json({ message: 'Post liked successfully' });
    } catch (error) {
        console.error('Like post error:', error);
        res.status(500).json({ error: 'Failed to like post' });
    }
};

const unlikePost = async (req, res) => {
    try {
        const { postId } = req.params;

        await prisma.postLike.delete({
            where: {
                userId_postId: {
                    userId: req.userId,
                    postId: parseInt(postId)
                }
            }
        });

        res.json({ message: 'Post unliked successfully' });
    } catch (error) {
        console.error('Unlike post error:', error);
        res.status(500).json({ error: 'Failed to unlike post' });
    }
};

const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;

        const post = await prisma.post.findUnique({
            where: { id: parseInt(postId) }
        });

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        if (post.userId !== req.userId) {
            return res.status(403).json({ error: 'Not authorized to delete this post' });
        }

        await prisma.post.delete({
            where: { id: parseInt(postId) }
        });

        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Delete post error:', error);
        res.status(500).json({ error: 'Failed to delete post' });
    }
};

module.exports = {
    createPost,
    getFeedPosts,
    getUserPosts,
    likePost,
    unlikePost,
    deletePost
};
