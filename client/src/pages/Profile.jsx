import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { User, BookOpen, Heart, MessageCircle, Users, UserPlus, UserMinus, Plus, X, LogOut, Trash2 } from 'lucide-react';

const Profile = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('posts');
    const [userPosts, setUserPosts] = useState([]);
    const [bookCollection, setBookCollection] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [stats, setStats] = useState({ posts: 0, books: 0, followers: 0, following: 0 });
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [newPost, setNewPost] = useState('');
    const [loading, setLoading] = useState(true);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    useEffect(() => {
        if (user) {
            fetchUserData();
        } else {
            // If user becomes null (logged out), redirect to home
            navigate('/');
        }
    }, [user]);

    const fetchUserData = async () => {
        try {
            setLoading(true);

            // Fetch posts
            const postsRes = await api.get(`/posts/user/${user.id}`);
            setUserPosts(postsRes.data.posts || []);

            // Fetch book collection (handle error gracefully)
            let booksData = [];
            try {
                const booksRes = await api.get('/books/collection');
                booksData = booksRes.data.books || [];
            } catch (bookError) {
                console.warn('Could not fetch book collection:', bookError);
                // Continue without books if there's an error
            }
            setBookCollection(booksData);

            // Fetch followers and following
            const [followersRes, followingRes] = await Promise.all([
                api.get(`/users/${user.id}/followers`),
                api.get(`/users/${user.id}/following`)
            ]);

            setFollowers(followersRes.data.followers || []);
            setFollowing(followingRes.data.following || []);

            setStats({
                posts: postsRes.data.posts?.length || 0,
                books: booksData.length || 0,
                followers: followersRes.data.followers?.length || 0,
                following: followersRes.data.following?.length || 0
            });
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const handleCreatePost = async () => {
        if (!newPost.trim()) return;

        try {
            const response = await api.post('/posts', { content: newPost });
            setUserPosts([response.data.post, ...userPosts]);
            setNewPost('');
            setShowCreatePost(false);
            setStats(prev => ({ ...prev, posts: prev.posts + 1 }));
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    const handleLikePost = async (postId) => {
        try {
            await api.post(`/posts/${postId}/like`);
            setUserPosts(userPosts.map(post =>
                post.id === postId
                    ? { ...post, _count: { ...post._count, likes: post._count.likes + 1 }, isLiked: true }
                    : post
            ));
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    const handleUnlikePost = async (postId) => {
        try {
            await api.delete(`/posts/${postId}/like`);
            setUserPosts(userPosts.map(post =>
                post.id === postId
                    ? { ...post, _count: { ...post._count, likes: post._count.likes - 1 }, isLiked: false }
                    : post
            ));
        } catch (error) {
            console.error('Error unliking post:', error);
        }
    };

    const handleDeletePost = async (postId) => {
        if (!window.confirm('Are you sure you want to delete this post?')) return;

        try {
            await api.delete(`/posts/${postId}`);
            setUserPosts(userPosts.filter(post => post.id !== postId));
            setStats(prev => ({ ...prev, posts: prev.posts - 1 }));
        } catch (error) {
            console.error('Error deleting post:', error);
            alert('Failed to delete post. Please try again.');
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-[#e8dcc3] flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">Please sign in to view your profile</h2>
                    <button
                        onClick={() => navigate('/login')}
                        className="bg-[#3d4f3d] text-[#e8e89a] px-6 py-3 rounded-full font-semibold hover:bg-[#2a3b2a] transition-colors"
                    >
                        Sign In
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#e8dcc3] py-8 px-4 md:px-8 lg:px-16">
            <div className="max-w-6xl mx-auto">
                {/* Profile Header */}
                <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        <div className="w-32 h-32 bg-gradient-to-br from-[#3d4f3d] to-[#2a3b2a] rounded-full flex items-center justify-center">
                            <User className="w-16 h-16 text-[#e8e89a]" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-3xl font-bold text-[#1a1a1a] mb-2">{user.fullName || user.username}</h1>
                            <p className="text-[#3d4f3d] mb-4">@{user.username}</p>
                            {user.bio && <p className="text-[#5a5a5a] mb-4">{user.bio}</p>}

                            {/* Stats */}
                            <div className="flex gap-8 justify-center md:justify-start">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-[#3d4f3d]">{stats.posts}</div>
                                    <div className="text-sm text-[#5a5a5a]">Posts</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-[#3d4f3d]">{stats.books}</div>
                                    <div className="text-sm text-[#5a5a5a]">Books</div>
                                </div>
                                <div className="text-center cursor-pointer" onClick={() => setActiveTab('followers')}>
                                    <div className="text-2xl font-bold text-[#3d4f3d]">{stats.followers}</div>
                                    <div className="text-sm text-[#5a5a5a]">Followers</div>
                                </div>
                                <div className="text-center cursor-pointer" onClick={() => setActiveTab('following')}>
                                    <div className="text-2xl font-bold text-[#3d4f3d]">{stats.following}</div>
                                    <div className="text-sm text-[#5a5a5a]">Following</div>
                                </div>
                            </div>

                            {/* Logout Button */}
                            <div className="mt-6">
                                <button
                                    onClick={() => setShowLogoutConfirm(true)}
                                    className="flex items-center gap-2 px-6 py-2 border-2 border-red-500 text-red-500 rounded-full font-semibold hover:bg-red-500 hover:text-white transition-colors"
                                >
                                    <LogOut className="w-5 h-5" />
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Logout Confirmation Dialog */}
                {showLogoutConfirm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
                        <div className="bg-white rounded-2xl p-6 max-w-md w-full">
                            <h3 className="text-xl font-bold text-[#1a1a1a] mb-4">Confirm Logout</h3>
                            <p className="text-[#5a5a5a] mb-6">Are you sure you want to logout?</p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => {
                                        setShowLogoutConfirm(false);
                                        handleLogout();
                                    }}
                                    className="flex-1 bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                                >
                                    Yes, Logout
                                </button>
                                <button
                                    onClick={() => setShowLogoutConfirm(false)}
                                    className="flex-1 bg-gray-200 text-[#1a1a1a] px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tabs */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                    <div className="flex border-b border-gray-200">
                        <button
                            onClick={() => setActiveTab('posts')}
                            className={`flex-1 px-6 py-4 font-semibold transition-colors ${activeTab === 'posts'
                                ? 'bg-[#3d4f3d] text-[#e8e89a]'
                                : 'text-[#3d4f3d] hover:bg-gray-50'
                                }`}
                        >
                            Posts
                        </button>
                        <button
                            onClick={() => setActiveTab('books')}
                            className={`flex-1 px-6 py-4 font-semibold transition-colors ${activeTab === 'books'
                                ? 'bg-[#3d4f3d] text-[#e8e89a]'
                                : 'text-[#3d4f3d] hover:bg-gray-50'
                                }`}
                        >
                            Book Collection
                        </button>
                        <button
                            onClick={() => setActiveTab('followers')}
                            className={`flex-1 px-6 py-4 font-semibold transition-colors ${activeTab === 'followers'
                                ? 'bg-[#3d4f3d] text-[#e8e89a]'
                                : 'text-[#3d4f3d] hover:bg-gray-50'
                                }`}
                        >
                            Followers
                        </button>
                        <button
                            onClick={() => setActiveTab('following')}
                            className={`flex-1 px-6 py-4 font-semibold transition-colors ${activeTab === 'following'
                                ? 'bg-[#3d4f3d] text-[#e8e89a]'
                                : 'text-[#3d4f3d] hover:bg-gray-50'
                                }`}
                        >
                            Following
                        </button>
                    </div>

                    <div className="p-6">
                        {/* Posts Tab */}
                        {activeTab === 'posts' && (
                            <div>
                                <button
                                    onClick={() => setShowCreatePost(true)}
                                    className="w-full mb-6 bg-[#e8e89a] text-[#1a1a1a] px-6 py-3 rounded-xl font-semibold hover:bg-[#d4d47a] transition-colors flex items-center justify-center gap-2"
                                >
                                    <Plus className="w-5 h-5" />
                                    Create New Post
                                </button>

                                {showCreatePost && (
                                    <div className="mb-6 bg-gray-50 rounded-xl p-4">
                                        <textarea
                                            value={newPost}
                                            onChange={(e) => setNewPost(e.target.value)}
                                            placeholder="What's on your mind?"
                                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d4f3d] resize-none"
                                            rows="4"
                                        />
                                        <div className="flex gap-2 mt-3">
                                            <button
                                                onClick={handleCreatePost}
                                                className="bg-[#3d4f3d] text-[#e8e89a] px-6 py-2 rounded-lg font-semibold hover:bg-[#2a3b2a] transition-colors"
                                            >
                                                Post
                                            </button>
                                            <button
                                                onClick={() => { setShowCreatePost(false); setNewPost(''); }}
                                                className="bg-gray-200 text-[#1a1a1a] px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {loading ? (
                                    <div className="text-center py-8 text-[#5a5a5a]">Loading posts...</div>
                                ) : userPosts.length === 0 ? (
                                    <div className="text-center py-8 text-[#5a5a5a]">No posts yet. Create your first post!</div>
                                ) : (
                                    <div className="space-y-4">
                                        {userPosts.map(post => (
                                            <div key={post.id} className="bg-white border-2 border-gray-100 rounded-xl p-4">
                                                <div className="flex items-start gap-3 mb-3">
                                                    <div className="w-10 h-10 bg-[#3d4f3d] rounded-full flex items-center justify-center">
                                                        <User className="w-5 h-5 text-[#e8e89a]" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="font-semibold text-[#1a1a1a]">{user.fullName || user.username}</div>
                                                        <div className="text-sm text-[#5a5a5a]">
                                                            {new Date(post.createdAt).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => handleDeletePost(post.id)}
                                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Delete post"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                                <p className="text-[#1a1a1a] mb-3">{post.content}</p>
                                                {post.image && (
                                                    <img src={post.image} alt="Post" className="rounded-lg mb-3 max-h-96 w-full object-cover" />
                                                )}
                                                <div className="flex gap-4">
                                                    <button
                                                        onClick={() => post.isLiked ? handleUnlikePost(post.id) : handleLikePost(post.id)}
                                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${post.isLiked
                                                            ? 'bg-red-100 text-red-600'
                                                            : 'bg-gray-100 text-[#5a5a5a] hover:bg-gray-200'
                                                            }`}
                                                    >
                                                        <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                                                        {post._count?.likes || 0}
                                                    </button>
                                                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-[#5a5a5a] hover:bg-gray-200 transition-colors">
                                                        <MessageCircle className="w-5 h-5" />
                                                        Comment
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Books Tab */}
                        {activeTab === 'books' && (
                            <div>
                                {loading ? (
                                    <div className="text-center py-8 text-[#5a5a5a]">Loading collection...</div>
                                ) : bookCollection.length === 0 ? (
                                    <div className="text-center py-8 text-[#5a5a5a]">
                                        <p className="mb-4">No books in your collection yet.</p>
                                        <button
                                            onClick={() => navigate('/')}
                                            className="bg-[#3d4f3d] text-[#e8e89a] px-6 py-3 rounded-full font-semibold hover:bg-[#2a3b2a] transition-colors"
                                        >
                                            Browse Books
                                        </button>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {bookCollection.map(book => (
                                            <div key={book.id} className="bg-white border-2 border-gray-100 rounded-xl p-4">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <BookOpen className="w-5 h-5 text-[#3d4f3d]" />
                                                    <h3 className="font-bold text-[#1a1a1a]">{book.title}</h3>
                                                </div>
                                                <p className="text-sm text-[#5a5a5a] mb-2">by {book.author}</p>
                                                {book.genre && (
                                                    <span className="inline-block bg-[#3d4f3d] text-[#e8e89a] text-xs px-3 py-1 rounded-full">
                                                        {book.genre}
                                                    </span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Followers Tab */}
                        {activeTab === 'followers' && (
                            <div>
                                {loading ? (
                                    <div className="text-center py-8 text-[#5a5a5a]">Loading followers...</div>
                                ) : followers.length === 0 ? (
                                    <div className="text-center py-8 text-[#5a5a5a]">No followers yet.</div>
                                ) : (
                                    <div className="space-y-3">
                                        {followers.map(follower => (
                                            <div key={follower.id} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                                <div className="w-12 h-12 bg-[#3d4f3d] rounded-full flex items-center justify-center">
                                                    <User className="w-6 h-6 text-[#e8e89a]" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-semibold text-[#1a1a1a]">{follower.fullName || follower.username}</div>
                                                    <div className="text-sm text-[#5a5a5a]">@{follower.username}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Following Tab */}
                        {activeTab === 'following' && (
                            <div>
                                {loading ? (
                                    <div className="text-center py-8 text-[#5a5a5a]">Loading following...</div>
                                ) : following.length === 0 ? (
                                    <div className="text-center py-8 text-[#5a5a5a]">Not following anyone yet.</div>
                                ) : (
                                    <div className="space-y-3">
                                        {following.map(user => (
                                            <div key={user.id} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                                <div className="w-12 h-12 bg-[#3d4f3d] rounded-full flex items-center justify-center">
                                                    <User className="w-6 h-6 text-[#e8e89a]" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-semibold text-[#1a1a1a]">{user.fullName || user.username}</div>
                                                    <div className="text-sm text-[#5a5a5a]">@{user.username}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
