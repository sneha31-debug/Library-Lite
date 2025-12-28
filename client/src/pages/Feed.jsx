import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import PostCard from '../components/PostCard';
import './Feed.css';

const Feed = () => {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newPost, setNewPost] = useState('');
    const [isPosting, setIsPosting] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            setIsLoading(true);
            const response = await api.get('/posts/feed');
            setPosts(response.data.posts || []);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreatePost = async (e) => {
        e.preventDefault();
        if (!newPost.trim()) return;

        setIsPosting(true);
        try {
            const response = await api.post('/posts', {
                content: newPost.trim()
            });
            setPosts([response.data.post, ...posts]);
            setNewPost('');
        } catch (error) {
            console.error('Error creating post:', error);
            alert('Failed to create post');
        } finally {
            setIsPosting(false);
        }
    };

    const handleDeletePost = (postId) => {
        setPosts(posts.filter(post => post.id !== postId));
    };

    return (
        <div className="feed-container">
            <div className="feed-header">
                <h1>Feed</h1>
            </div>

            {user && (
                <div className="create-post-section">
                    <form onSubmit={handleCreatePost} className="create-post-form">
                        <img
                            src={user.profilePicture || '/default-avatar.png'}
                            alt={user.username}
                            className="create-post-avatar"
                        />
                        <div className="create-post-input-area">
                            <textarea
                                value={newPost}
                                onChange={(e) => setNewPost(e.target.value)}
                                placeholder="What's on your mind?"
                                className="create-post-input"
                                rows="3"
                                disabled={isPosting}
                            />
                            <button
                                type="submit"
                                className="create-post-btn"
                                disabled={isPosting || !newPost.trim()}
                            >
                                {isPosting ? 'Posting...' : 'Post'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="posts-section">
                {isLoading ? (
                    <div className="loading-posts">
                        <div className="spinner"></div>
                        <p>Loading posts...</p>
                    </div>
                ) : posts.length === 0 ? (
                    <div className="no-posts">
                        <p>No posts yet. Be the first to share something!</p>
                    </div>
                ) : (
                    posts.map(post => (
                        <PostCard
                            key={post.id}
                            post={post}
                            currentUserId={user?.id}
                            onDelete={handleDeletePost}
                            onUpdate={fetchPosts}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default Feed;
