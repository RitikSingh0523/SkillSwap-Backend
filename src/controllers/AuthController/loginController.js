require('dotenv').config();
const errorHandler = require('../../middleware/errorHandler');
const successHandler = require('../../middleware/successHandler');
const User = require('../../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const verifyUser = await bcrypt.compare(password, user.password);
    if (!verifyUser) {
      return res.send(
        errorHandler({
          status: 401,
          message: 'Invalid credentials',
        })
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );

    let userData;
    if (verifyUser) {
      userData = {
        id: user._id,
        name: user.name,
        email: user.email,
        token,
      };
    }

    res.send(
      successHandler({
        status: 200,
        data: verifyUser ? userData : null,
        message: verifyUser ? 'Login successful' : 'Invalid credentials',
      })
    );
  } catch (error) {
    res.send(
      errorHandler({
        status: 500,
        message: 'Error during login: ' + error.message,
      })
    );
  }
};

module.exports = { loginController };
