import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../services/api';
import './CommentSection.css';

const CommentSection = ({ postId, currentUserId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchComments();
    }, [postId]);

    const fetchComments = async () => {
        try {
            setIsLoading(true);
            const response = await api.get(`/comments/post/${postId}`);
            setComments(response.data.comments || []);
        } catch (error) {
            console.error('Error fetching comments:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        setIsSubmitting(true);
        try {
            const response = await api.post(`/comments/post/${postId}`, {
                content: newComment.trim()
            });
            setComments([response.data.comment, ...comments]);
            setNewComment('');
        } catch (error) {
            console.error('Error posting comment:', error);
            alert('Failed to post comment');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteComment = async (commentId) => {
        if (!window.confirm('Are you sure you want to delete this comment?')) return;

        try {
            await api.delete(`/comments/${commentId}`);
            setComments(comments.filter(comment => comment.id !== commentId));
        } catch (error) {
            console.error('Error deleting comment:', error);
            alert('Failed to delete comment');
        }
    };

    const formatDate = (date) => {
        const now = new Date();
        const commentDate = new Date(date);
        const diffInSeconds = Math.floor((now - commentDate) / 1000);

        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;

        return commentDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: commentDate.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
        });
    };

    return (
        <div className="comment-section">
            <form onSubmit={handleSubmitComment} className="comment-form">
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="comment-input"
                    disabled={isSubmitting}
                />
                <button
                    type="submit"
                    className="comment-submit-btn"
                    disabled={isSubmitting || !newComment.trim()}
                >
                    {isSubmitting ? '...' : 'Post'}
                </button>
            </form>

            <div className="comments-list">
                {isLoading ? (
                    <div className="loading-comments">Loading comments...</div>
                ) : comments.length === 0 ? (
                    <div className="no-comments">No comments yet. Be the first to comment!</div>
                ) : (
                    comments.map(comment => (
                        <div key={comment.id} className="comment-item">
                            <img
                                src={comment.user?.profilePicture || '/default-avatar.png'}
                                alt={comment.user?.username}
                                className="comment-avatar"
                            />
                            <div className="comment-content">
                                <div className="comment-header">
                                    <span className="comment-author">
                                        {comment.user?.fullName || comment.user?.username}
                                    </span>
                                    <span className="comment-time">{formatDate(comment.createdAt)}</span>
                                </div>
                                <p className="comment-text">{comment.content}</p>
                            </div>
                            {currentUserId === comment.userId && (
                                <button
                                    className="comment-delete-btn"
                                    onClick={() => handleDeleteComment(comment.id)}
                                >
                                    ×
                                </button>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

CommentSection.propTypes = {
    postId: PropTypes.number.isRequired,
    currentUserId: PropTypes.number
};

export default CommentSection;
