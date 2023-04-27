const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//static signup method
userSchema.statics.signup = async function (name, email, password) {
  //field validation
  if (!name || !email || !password) {
    throw Error('All fields must be filled');
  }
  if (!validator.isEmail(email)) {
    throw Error('Must be a valid email');
  }

  //check if email already exists in database
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error('Email already in use');
  }

  if (!validator.isStrongPassword(password)) {
    throw Error('Password is not strong enough');
  }

  //hash password with salt
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  //add new user to database
  const user = await this.create({ name, email, password: hash });
  return user;
};

//static login method
userSchema.statics.login = async function (email, password) {
  //field validation
  if (!email || !password) {
    throw Error('All fields must be filled');
  }

  //check if email exists in database
  const user = await this.findOne({ email });
  if (!user) {
    throw Error('Email not found');
  }

  //check password
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error('Incorrect password');
  }

  return user;
};

module.exports = mongoose.model('User', userSchema);
