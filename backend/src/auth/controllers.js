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
  getCurrentUser,
  logout
};