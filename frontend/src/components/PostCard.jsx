import { useState } from 'react';
import PropTypes from 'prop-types';
import api from '../services/api';
import CommentSection from './CommentSection';
import './PostCard.css';

const PostCard = ({ post, onDelete, onUpdate, currentUserId }) => {
    const [isLiked, setIsLiked] = useState(post.isLiked || false);
    const [likeCount, setLikeCount] = useState(post._count?.likes || 0);
    const [showComments, setShowComments] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleLike = async () => {
        try {
            if (isLiked) {
                await api.delete(`/posts/${post.id}/like`);
                setIsLiked(false);
                setLikeCount(prev => prev - 1);
            } else {
                await api.post(`/posts/${post.id}/like`);
                setIsLiked(true);
                setLikeCount(prev => prev + 1);
            }
            if (onUpdate) onUpdate();
        } catch (error) {
            console.error('Error toggling like:', error);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this post?')) return;

        setIsDeleting(true);
        try {
            await api.delete(`/posts/${post.id}`);
            if (onDelete) onDelete(post.id);
        } catch (error) {
            console.error('Error deleting post:', error);
            alert('Failed to delete post');
        } finally {
            setIsDeleting(false);
        }
    };

    const formatDate = (date) => {
        const now = new Date();
        const postDate = new Date(date);
        const diffInSeconds = Math.floor((now - postDate) / 1000);

        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;

        return postDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: postDate.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
        });
    };

    return (
        <div className="post-card">
            <div className="post-header">
                <div className="post-user-info">
                    <img
                        src={post.user?.profilePicture || '/default-avatar.png'}
                        alt={post.user?.username}
                        className="post-avatar"
                    />
                    <div className="post-user-details">
                        <h4 className="post-username">{post.user?.fullName || post.user?.username}</h4>
                        <span className="post-time">{formatDate(post.createdAt)}</span>
                    </div>
                </div>
                {currentUserId === post.userId && (
                    <button
                        className="post-delete-btn"
                        onClick={handleDelete}
                        disabled={isDeleting}
                    >
                        {isDeleting ? '...' : '×'}
                    </button>
                )}
            </div>

            <div className="post-content">
                <p>{post.content}</p>
                {post.image && (
                    <img
                        src={post.image}
                        alt="Post content"
                        className="post-image"
                    />
                )}
            </div>

            <div className="post-actions">
                <button
                    className={`post-action-btn like-btn ${isLiked ? 'liked' : ''}`}
                    onClick={handleLike}
                >
                    <svg
                        className="heart-icon"
                        viewBox="0 0 24 24"
                        fill={isLiked ? '#ff3b5c' : 'none'}
                        stroke={isLiked ? '#ff3b5c' : 'currentColor'}
                        strokeWidth="2"
                    >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    <span className="action-count">{likeCount}</span>
                </button>

                <button
                    className="post-action-btn comment-btn"
                    onClick={() => setShowComments(!showComments)}
                >
                    <svg
                        className="comment-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    <span className="action-text">Comment</span>
                </button>
            </div>

            {showComments && (
                <CommentSection
                    postId={post.id}
                    currentUserId={currentUserId}
                />
            )}
        </div>
    );
};

PostCard.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number.isRequired,
        content: PropTypes.string.isRequired,
        image: PropTypes.string,
        createdAt: PropTypes.string.isRequired,
        userId: PropTypes.number.isRequired,
        isLiked: PropTypes.bool,
        _count: PropTypes.shape({
            likes: PropTypes.number
        }),
        user: PropTypes.shape({
            id: PropTypes.number,
            username: PropTypes.string,
            fullName: PropTypes.string,
            profilePicture: PropTypes.string
        })
    }).isRequired,
    onDelete: PropTypes.func,
    onUpdate: PropTypes.func,
    currentUserId: PropTypes.number
};

export default PostCard;
