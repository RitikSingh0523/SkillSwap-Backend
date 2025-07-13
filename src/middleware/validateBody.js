const errorHandler = require('./errorHandler');

// Validate the request body for user registration.
const validateUser = (req, res, next) => {
  const { name, email, password, location, skillOffered } = req.body;

  try {
    if (!name) {
      return res.send(
        errorHandler({ status: 400, message: 'Name is required' })
      );
    }
    if (!email) {
      return res.send(
        errorHandler({ status: 400, message: 'Email is required' })
      );
    }
    if (!password) {
      return res.send(
        errorHandler({ status: 400, message: 'Password is required' })
      );
    }
    if (!location) {
      return res.send(
        errorHandler({ status: 400, message: 'Location is required' })
      );
    }
    if (!skillOffered || skillOffered.length === 0) {
      return res.send(
        errorHandler({
          status: 400,
          message: 'At least one skill offered is required',
        })
      );
    }

    next();
  } catch (error) {
    return res.send(errorHandler({ status: 400, message: error.message }));
  }
};

// Validate the request body for user login.
const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    return res.send(
      errorHandler({ status: 400, message: 'Email is required' })
    );
  }
  if (!password) {
    return res.send(
      errorHandler({ status: 400, message: 'Password is required' })
    );
  }
  next();
};

// Validate the request body for user profile retrieval.
const validateUserProfile = (req, res, next) => {
  const { id } = req.body;
  if (!id) {
    return res.send(errorHandler({ status: 400, message: 'Id is required' }));
  }
  next();
};

// Validate the request body for another user's profile retrieval.
const validateOtherUserProfile = (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.send(errorHandler({ status: 400, message: 'Id is required' }));
  }
  next();
};

// Validate the request body for connection data.
const validateConnectionData = (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.send(errorHandler({ status: 400, message: 'Id is required' }));
  }
  if (!req.user || !req.user.id) {
    return res.send(
      errorHandler({ status: 401, message: 'User authentication required' })
    );
  }
  next();
};

module.exports = {
  validateUser,
  validateLogin,
  validateUserProfile,
  validateOtherUserProfile,
  validateConnectionData,
};
