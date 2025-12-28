const { prisma } = require('../db/config');

const createPostComment = async (req, res) => {
    try {
        const { postId } = req.params;
        const { content } = req.body;

        if (!content || content.trim() === '') {
            return res.status(400).json({ error: 'Comment content is required' });
        }

        const comment = await prisma.postComment.create({
            data: {
                userId: req.userId,
                postId: parseInt(postId),
                content: content.trim()
            },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        fullName: true,
                        profilePicture: true
                    }
                }
            }
        });

        res.status(201).json({ message: 'Comment created successfully', comment });
    } catch (error) {
        console.error('Create comment error:', error);
        res.status(500).json({ error: 'Failed to create comment' });
    }
};

const getPostComments = async (req, res) => {
    try {
        const { postId } = req.params;

        const comments = await prisma.postComment.findMany({
            where: { postId: parseInt(postId) },
            orderBy: { createdAt: 'desc' },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        fullName: true,
                        profilePicture: true
                    }
                }
            }
        });

        res.json({ comments });
    } catch (error) {
        console.error('Get comments error:', error);
        res.status(500).json({ error: 'Failed to get comments' });
    }
};

const deletePostComment = async (req, res) => {
    try {
        const { commentId } = req.params;

        const comment = await prisma.postComment.findUnique({
            where: { id: parseInt(commentId) }
        });

        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        if (comment.userId !== req.userId) {
            return res.status(403).json({ error: 'Not authorized to delete this comment' });
        }

        await prisma.postComment.delete({
            where: { id: parseInt(commentId) }
        });

        res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error('Delete comment error:', error);
        res.status(500).json({ error: 'Failed to delete comment' });
    }
};

module.exports = {
    createPostComment,
    getPostComments,
    deletePostComment
};
