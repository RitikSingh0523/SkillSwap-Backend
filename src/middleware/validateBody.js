const validateUser = (req, res, next) => {
  const { name, email, password, location, skillOffered } = req.body;

  if (!name) {
    throw new Error('Name is required');
  }
  if (!email) {
    throw new Error('Email is required');
  }
  if (!password) {
    throw new Error('Password is required');
  }
  if (!location) {
    throw new Error('Location is required');
  }
  if (!skillOffered || skillOffered.length === 0) {
    return res.status(400).json({ error: 'Skill Offered is required' });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    throw new Error('Email is required');
  }
  if (!password) {
    throw new Error('Password is required');
  }
  next();
}
module.exports = { validateUser, validateLogin };
