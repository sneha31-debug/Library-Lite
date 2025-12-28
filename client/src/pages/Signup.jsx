import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Mail, Lock, User, Eye, EyeOff, Check } from 'lucide-react';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name) {
            newErrors.name = 'Name is required';
        } else if (formData.name.length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = 'Password must contain uppercase, lowercase, and number';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!agreeToTerms) {
            newErrors.terms = 'You must agree to the terms and conditions';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const { register } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            const result = await register({
                email: formData.email,
                username: formData.name.toLowerCase().replace(/\s+/g, ''),
                fullName: formData.name,
                password: formData.password
            });

            if (result.success) {
                navigate('/');
            } else {
                setErrors(prev => ({ ...prev, submit: result.error }));
            }
        }
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    const passwordStrength = () => {
        const password = formData.password;
        if (!password) return { strength: 0, label: '', color: '' };

        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[^a-zA-Z0-9]/.test(password)) strength++;

        if (strength <= 2) return { strength, label: 'Weak', color: 'bg-red-500' };
        if (strength <= 3) return { strength, label: 'Medium', color: 'bg-yellow-500' };
        return { strength, label: 'Strong', color: 'bg-green-500' };
    };

    const strength = passwordStrength();

    return (
        <div className="min-h-screen bg-[#e8dcc3] flex items-center justify-center px-4 py-12">
            <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center">
                {/* Left Side - Signup Form */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 order-2 md:order-1">
                    {/* Mobile Logo */}
                    <div className="md:hidden flex items-center justify-center gap-3 mb-8">
                        <div className="bg-[#3d4f3d] w-12 h-12 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-[#e8e89a]" />
                        </div>
                        <span className="text-3xl font-bold text-[#1a1a1a]">BookVerse</span>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-2">
                            Create Account
                        </h2>
                        <p className="text-[#3d4f3d]">
                            Join our community of book lovers today
                        </p>
                        {errors.submit && (
                            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                                {errors.submit}
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                                Full Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <User className="w-5 h-5 text-[#3d4f3d]" />
                                </div>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3d4f3d] transition-all ${errors.name ? 'border-red-500' : 'border-gray-200'
                                        }`}
                                    placeholder="John Doe"
                                />
                            </div>
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                            )}
                        </div>

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
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
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
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3d4f3d] transition-all ${errors.password ? 'border-red-500' : 'border-gray-200'
                                        }`}
                                    placeholder="Create a strong password"
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
                            {formData.password && (
                                <div className="mt-2">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${strength.color} transition-all duration-300`}
                                                style={{ width: `${(strength.strength / 5) * 100}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-xs font-semibold text-[#3d4f3d]">{strength.label}</span>
                                    </div>
                                </div>
                            )}
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="w-5 h-5 text-[#3d4f3d]" />
                                </div>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3d4f3d] transition-all ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'
                                        }`}
                                    placeholder="Confirm your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="w-5 h-5 text-[#3d4f3d]" />
                                    ) : (
                                        <Eye className="w-5 h-5 text-[#3d4f3d]" />
                                    )}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                            )}
                        </div>

                        {/* Terms and Conditions */}
                        <div>
                            <label className="flex items-start cursor-pointer">
                                <div className="relative flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={agreeToTerms}
                                        onChange={(e) => setAgreeToTerms(e.target.checked)}
                                        className="w-5 h-5 text-[#3d4f3d] border-gray-300 rounded focus:ring-[#3d4f3d]"
                                    />
                                </div>
                                <span className="ml-3 text-sm text-[#3d4f3d]">
                                    I agree to the{' '}
                                    <a href="#" className="font-semibold text-[#3d4f3d] hover:text-[#2a3b2a] underline">
                                        Terms and Conditions
                                    </a>{' '}
                                    and{' '}
                                    <a href="#" className="font-semibold text-[#3d4f3d] hover:text-[#2a3b2a] underline">
                                        Privacy Policy
                                    </a>
                                </span>
                            </label>
                            {errors.terms && (
                                <p className="mt-1 text-sm text-red-500">{errors.terms}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-[#3d4f3d] text-[#e8e89a] py-3 rounded-xl font-semibold hover:bg-[#2a3b2a] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                        >
                            Create Account
                        </button>

                        {/* Divider */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-[#3d4f3d]">Or sign up with</span>
                            </div>
                        </div>

                        {/* Social Signup Buttons */}
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

                        {/* Login Link */}
                        <div className="text-center">
                            <p className="text-[#3d4f3d]">
                                Already have an account?{' '}
                                <button
                                    type="button"
                                    onClick={handleLoginClick}
                                    className="font-semibold text-[#3d4f3d] hover:text-[#2a3b2a] underline transition-colors"
                                >
                                    Sign in
                                </button>
                            </p>
                        </div>
                    </form>
                </div>

                {/* Right Side - Branding */}
                <div className="hidden md:block order-1 md:order-2">
                    <div className="bg-gradient-to-br from-[#3d4f3d] to-[#2a3b2a] rounded-3xl p-12 shadow-2xl">
                        <div className="bg-[#e8e89a] w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                            <BookOpen className="w-12 h-12 text-[#2a3b2a]" />
                        </div>
                        <h2 className="text-4xl font-bold text-[#e8dcc3] text-center mb-4">
                            Join BookVerse
                        </h2>
                        <h3 className="text-5xl font-bold text-[#e8e89a] text-center mb-6">
                            Today
                        </h3>
                        <p className="text-[#e8dcc3] text-lg text-center mb-8">
                            Become part of a vibrant community of readers. Track your reading journey, discover new books, and share your thoughts with fellow book enthusiasts.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="bg-[#e8e89a] rounded-full p-1 mt-1">
                                    <Check className="w-4 h-4 text-[#2a3b2a]" />
                                </div>
                                <div>
                                    <h4 className="text-[#e8dcc3] font-semibold mb-1">Track Your Reading</h4>
                                    <p className="text-[#e8dcc3] text-sm">Keep a digital record of all the books you've read and want to read.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="bg-[#e8e89a] rounded-full p-1 mt-1">
                                    <Check className="w-4 h-4 text-[#2a3b2a]" />
                                </div>
                                <div>
                                    <h4 className="text-[#e8dcc3] font-semibold mb-1">Discover New Books</h4>
                                    <p className="text-[#e8dcc3] text-sm">Get personalized recommendations based on your reading preferences.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="bg-[#e8e89a] rounded-full p-1 mt-1">
                                    <Check className="w-4 h-4 text-[#2a3b2a]" />
                                </div>
                                <div>
                                    <h4 className="text-[#e8dcc3] font-semibold mb-1">Share Reviews</h4>
                                    <p className="text-[#e8dcc3] text-sm">Write and read reviews from a community of passionate readers.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="bg-[#e8e89a] rounded-full p-1 mt-1">
                                    <Check className="w-4 h-4 text-[#2a3b2a]" />
                                </div>
                                <div>
                                    <h4 className="text-[#e8dcc3] font-semibold mb-1">Connect with Readers</h4>
                                    <p className="text-[#e8dcc3] text-sm">Join discussions and connect with fellow book lovers worldwide.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
