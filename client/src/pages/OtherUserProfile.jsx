import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { User, BookOpen, Heart, MessageCircle, ArrowLeft, UserPlus, UserMinus } from 'lucide-react';

const OtherUserProfile = () => {
    const navigate = useNavigate();
    const { userId } = useParams();
    const { user: currentUser } = useAuth();
    const [profileUser, setProfileUser] = useState(null);
    const [activeTab, setActiveTab] = useState('posts');
    const [userPosts, setUserPosts] = useState([]);
    const [bookCollection, setBookCollection] = useState([]);
    const [stats, setStats] = useState({ posts: 0, books: 0, followers: 0, following: 0 });
    const [loading, setLoading] = useState(true);
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        if (userId) {
            fetchUserProfile();
        }
    }, [userId]);

    const fetchUserProfile = async () => {
        try {
            setLoading(true);

            // Fetch user profile
            const profileRes = await api.get(`/users/${userId}`);
            setProfileUser(profileRes.data.user);
            setStats({
                posts: profileRes.data.user._count.posts || 0,
                books: profileRes.data.user._count.books || 0,
                followers: profileRes.data.user._count.followers || 0,
                following: profileRes.data.user._count.following || 0
            });

            // Fetch user's posts
            const postsRes = await api.get(`/posts/user/${userId}`);
            setUserPosts(postsRes.data.posts || []);

            // Check if current user is following this user
            if (currentUser) {
                const followingRes = await api.get(`/users/${currentUser.id}/following`);
                const isFollowingUser = followingRes.data.following.some(f => f.id === parseInt(userId));
                setIsFollowing(isFollowingUser);
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFollow = async () => {
        try {
            await api.post(`/users/${userId}/follow`);
            setIsFollowing(true);
            setStats(prev => ({ ...prev, followers: prev.followers + 1 }));
        } catch (error) {
            console.error('Error following user:', error);
        }
    };

    const handleUnfollow = async () => {
        try {
            await api.delete(`/users/${userId}/unfollow`);
            setIsFollowing(false);
            setStats(prev => ({ ...prev, followers: prev.followers - 1 }));
        } catch (error) {
            console.error('Error unfollowing user:', error);
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

    if (loading) {
        return (
            <div className="min-h-screen bg-[#e8dcc3] flex items-center justify-center">
                <div className="text-2xl font-bold text-[#3d4f3d]">Loading...</div>
            </div>
        );
    }

    if (!profileUser) {
        return (
            <div className="min-h-screen bg-[#e8dcc3] flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">User not found</h2>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-[#3d4f3d] text-[#e8e89a] px-6 py-3 rounded-full font-semibold hover:bg-[#2a3b2a] transition-colors"
                    >
                        Go Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#e8dcc3] py-8 px-4 md:px-8 lg:px-16">
            <div className="max-w-6xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-4 flex items-center gap-2 text-[#3d4f3d] hover:text-[#2a3b2a] transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back
                </button>

                {/* Profile Header */}
                <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        <div className="w-32 h-32 bg-gradient-to-br from-[#3d4f3d] to-[#2a3b2a] rounded-full flex items-center justify-center">
                            {profileUser.profilePicture ? (
                                <img src={profileUser.profilePicture} alt={profileUser.username} className="w-full h-full rounded-full object-cover" />
                            ) : (
                                <User className="w-16 h-16 text-[#e8e89a]" />
                            )}
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-3xl font-bold text-[#1a1a1a] mb-2">{profileUser.fullName || profileUser.username}</h1>
                            <p className="text-[#3d4f3d] mb-4">@{profileUser.username}</p>
                            {profileUser.bio && <p className="text-[#5a5a5a] mb-4">{profileUser.bio}</p>}

                            {/* Stats */}
                            <div className="flex gap-8 justify-center md:justify-start mb-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-[#3d4f3d]">{stats.posts}</div>
                                    <div className="text-sm text-[#5a5a5a]">Posts</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-[#3d4f3d]">{stats.books}</div>
                                    <div className="text-sm text-[#5a5a5a]">Books</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-[#3d4f3d]">{stats.followers}</div>
                                    <div className="text-sm text-[#5a5a5a]">Followers</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-[#3d4f3d]">{stats.following}</div>
                                    <div className="text-sm text-[#5a5a5a]">Following</div>
                                </div>
                            </div>

                            {/* Follow/Unfollow Button */}
                            {currentUser && currentUser.id !== parseInt(userId) && (
                                <button
                                    onClick={isFollowing ? handleUnfollow : handleFollow}
                                    className={`flex items-center gap-2 px-6 py-2 rounded-full font-semibold transition-colors ${isFollowing
                                            ? 'bg-gray-200 text-[#1a1a1a] hover:bg-gray-300'
                                            : 'bg-[#3d4f3d] text-[#e8e89a] hover:bg-[#2a3b2a]'
                                        }`}
                                >
                                    {isFollowing ? (
                                        <>
                                            <UserMinus className="w-5 h-5" />
                                            Unfollow
                                        </>
                                    ) : (
                                        <>
                                            <UserPlus className="w-5 h-5" />
                                            Follow
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

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
                    </div>

                    <div className="p-6">
                        {/* Posts Tab */}
                        {activeTab === 'posts' && (
                            <div>
                                {userPosts.length === 0 ? (
                                    <div className="text-center py-8 text-[#5a5a5a]">No posts yet.</div>
                                ) : (
                                    <div className="space-y-4">
                                        {userPosts.map(post => (
                                            <div key={post.id} className="bg-white border-2 border-gray-100 rounded-xl p-4">
                                                <div className="flex items-start gap-3 mb-3">
                                                    <div className="w-10 h-10 bg-[#3d4f3d] rounded-full flex items-center justify-center">
                                                        {profileUser.profilePicture ? (
                                                            <img src={profileUser.profilePicture} alt={profileUser.username} className="w-full h-full rounded-full object-cover" />
                                                        ) : (
                                                            <User className="w-5 h-5 text-[#e8e89a]" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="font-semibold text-[#1a1a1a]">{profileUser.fullName || profileUser.username}</div>
                                                        <div className="text-sm text-[#5a5a5a]">
                                                            {new Date(post.createdAt).toLocaleDateString()}
                                                        </div>
                                                    </div>
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OtherUserProfile;
