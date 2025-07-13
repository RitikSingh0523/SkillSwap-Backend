require('dotenv').config();
const jwt = require('jsonwebtoken');

JWT_SECRET = process.env.JWT_SECRET;

const authUser = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send({
      status: 401,
      message: 'Authentication token is missing',
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).send({
      status: 401,
      message: 'Invalid authentication token',
    });
  }
};

module.exports = {authUser};