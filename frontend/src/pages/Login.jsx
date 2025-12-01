import React, { useState } from 'react';
import { BookOpen, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const Login = ({ onNavigate }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // TODO: Integrate with backend authentication API
            console.log('Login attempt:', { email, password, rememberMe });
            // Add your authentication logic here
        }
    };

    const handleSignupClick = () => {
        onNavigate('signup');
    };

    return (
        <div className="min-h-screen bg-[#e8dcc3] flex items-center justify-center px-4 py-12">
            <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center">
                {/* Left Side - Branding */}
                <div className="hidden md:block">
                    <div className="bg-gradient-to-br from-[#3d4f3d] to-[#2a3b2a] rounded-3xl p-12 text-center shadow-2xl">
                        <div className="bg-[#e8e89a] w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                            <BookOpen className="w-12 h-12 text-[#2a3b2a]" />
                        </div>
                        <h1 className="text-4xl font-bold text-[#e8dcc3] mb-4">
                            Welcome Back to
                        </h1>
                        <h2 className="text-5xl font-bold text-[#e8e89a] mb-6">
                            BookVerse
                        </h2>
                        <p className="text-[#e8dcc3] text-lg mb-8">
                            Continue your literary journey. Discover, track, and share your reading adventures with our community of book lovers.
                        </p>
                        <div className="flex items-center justify-center gap-8 text-[#e8dcc3]">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-[#e8e89a]">1,000+</div>
                                <div className="text-sm">Books</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-[#e8e89a]">5,000+</div>
                                <div className="text-sm">Readers</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-[#e8e89a]">10,000+</div>
                                <div className="text-sm">Reviews</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
                    {/* Mobile Logo */}
                    <div className="md:hidden flex items-center justify-center gap-3 mb-8">
                        <div className="bg-[#3d4f3d] w-12 h-12 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-[#e8e89a]" />
                        </div>
                        <span className="text-3xl font-bold text-[#1a1a1a]">BookVerse</span>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-2">
                            Sign In
                        </h2>
                        <p className="text-[#3d4f3d]">
                            Enter your credentials to access your account
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="w-5 h-5 text-[#3d4f3d]" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3d4f3d] transition-all ${errors.email ? 'border-red-500' : 'border-gray-200'
                                        }`}
                                    placeholder="your.email@example.com"
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="w-5 h-5 text-[#3d4f3d]" />
                                </div>
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3d4f3d] transition-all ${errors.password ? 'border-red-500' : 'border-gray-200'
                                        }`}
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5 text-[#3d4f3d]" />
                                    ) : (
                                        <Eye className="w-5 h-5 text-[#3d4f3d]" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                            )}
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 text-[#3d4f3d] border-gray-300 rounded focus:ring-[#3d4f3d]"
                                />
                                <span className="ml-2 text-sm text-[#3d4f3d]">Remember me</span>
                            </label>
                            <a href="#" className="text-sm font-semibold text-[#3d4f3d] hover:text-[#2a3b2a] transition-colors">
                                Forgot password?
                            </a>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-[#3d4f3d] text-[#e8e89a] py-3 rounded-xl font-semibold hover:bg-[#2a3b2a] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                        >
                            Sign In
                        </button>

                        {/* Divider */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-[#3d4f3d]">Or continue with</span>
                            </div>
                        </div>

                        {/* Social Login Buttons */}
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                <span className="text-sm font-semibold text-[#1a1a1a]">Google</span>
                            </button>
                            <button
                                type="button"
                                className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                                <span className="text-sm font-semibold text-[#1a1a1a]">Facebook</span>
                            </button>
                        </div>

                        {/* Sign Up Link */}
                        <div className="text-center">
                            <p className="text-[#3d4f3d]">
                                Don't have an account?{' '}
                                <button
                                    type="button"
                                    onClick={handleSignupClick}
                                    className="font-semibold text-[#3d4f3d] hover:text-[#2a3b2a] underline transition-colors"
                                >
                                    Sign up
                                </button>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
