const { Prisma } = require('@prisma/client');

const errorHandler = (err, req, res, next) => {
  console.error(err);
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      return res.status(400).json({
        error: `${err.meta.target[0]} already exists`
      });
    }
    if (err.code === 'P2025') {
      return res.status(404).json({
        error: 'Record not found'
      });
    }
  }
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation failed',
      details: err.message
    });
  }
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'Invalid token'
    });
  }
  res.status(err.statusCode || 500).json({
    error: err.message || 'Internal server error'
  });
};

module.exports = { errorHandler };