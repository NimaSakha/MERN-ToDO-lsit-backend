const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

const createToken = _id => {
  return jwt.sign({ _id }, process.env.SECRET);
};
const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    const email = await user.email;
    res.status(200).json({
      user: {
        email,
        id,
      },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const userSignup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);

    const token = createToken(user._id);
    res.status(200).json({ user, status: 'success', token });
  } catch (err) {
    res.status(400).json({ error: err.message, status: 'error' });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ user, token, status: 'success' });
  } catch (err) {
    res.status(400).json({ error: err.message, status: 'error' });
  }
};

module.exports = { userSignup, userLogin, getUser };
