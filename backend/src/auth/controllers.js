const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { prisma } = require('../../db/config');

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

const register = async (req, res) => {
  try {
    const { email, username, password, fullName } = req.body;
    if (!email || !username || !password) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }]
      }
    });

    if (existingUser) {
      return res.status(400).json({
        error: existingUser.email === email ? 'Email already registered' : 'Username already taken'
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        fullName: fullName || username
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
    const token = generateToken(user.id);

    res.status(201).json({
      message: 'User registered successfully',
      user,
      token
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = generateToken(user.id);
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      message: 'Login successful',
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
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
            comments: true
          }
        }
      }
    });

    res.json({ user });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ error: 'Failed to get user information' });
  }
};

const { OAuth2Client } = require('google-auth-library');
const axios = require('axios');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: 'Token is required' });
    }

    // Verify Google Token (Access Token flow)
    // Since we are receiving an access token from the frontend (useGoogleLogin default),
    // we need to fetch the user info directly from Google.

    const googleUserResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const { email, name, picture, sub: googleId } = googleUserResponse.data;

    // Check if user exists
    let user = await prisma.user.findFirst({
      where: { email }
    });

    if (!user) {
      // Create new user if not exists
      // Generate a random password since they use Google login
      const randomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      // Generate a unique username from email or name
      let username = email.split('@')[0];
      const existingUsername = await prisma.user.findUnique({ where: { username } });
      if (existingUsername) {
        username = `${username}${Math.floor(Math.random() * 1000)}`;
      }

      user = await prisma.user.create({
        data: {
          email,
          username,
          fullName: name,
          password: hashedPassword,
          profilePicture: picture,
          bio: 'Joined via Google'
        }
      });
    }

    const jwtToken = generateToken(user.id);
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      message: 'Google login successful',
      user: userWithoutPassword,
      token: jwtToken
    });

  } catch (error) {
    console.error('Google login error:', error.response?.data || error.message);
    res.status(401).json({ error: 'Google authentication failed' });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie('token');
    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Logout failed' });
  }
};

module.exports = {
  register,
  login,
  googleLogin,
  getCurrentUser,
  logout
};