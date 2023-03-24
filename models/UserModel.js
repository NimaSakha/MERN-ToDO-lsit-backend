const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  }
});

userSchema.statics.signup = async function (email, password) {
  if ((!email, !password)) {
    throw Error('please fill out all required fields');
  }
  if (!validator.isEmail(email)) {
    throw Error('please input valid Email');
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password is not strong');
  }
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error('Email already in use');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    email,
    password: hash
  });
  return user;
};
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error('Please fill all input fields');
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error('There is no accounts with this email');
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error('Incorrect Password');
  }
  return user;
};

module.exports = mongoose.model('User', userSchema);

