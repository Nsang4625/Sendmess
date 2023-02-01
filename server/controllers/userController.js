const asyncHandler = require('express-async-handler');
const User = require('../Models/userModel');
const generateToken = require('../config/generateToken');

exports.register = asyncHandler(async (req, res) => {
  const { name, password, email } = req.body;
  if (!name || !password || !email) {
    res.status(404);
    throw new Error('Please fulfil all the fields');
  }
  const checkIfEmailExisted = User.findOne({ email });
  if (checkIfEmailExisted) {
    res.status(404);
    throw new Error('Email already existed');
  }
  const user = await User.create({
    name,
    email,
    password
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error('Register failed');
  }
});

exports.auth = asyncHandler(async (req, res) => {
  const { email, password } = req;
  const user = User.findOne({ email });
  if (!user) {
    res.status(400).json({
      status: 'fail',
      message: 'Please provide valid email and password'
    });
  } else if (user.matchPassword(password)) {
    res.status(201).json({
      _id: user._id,
      email: user.email,
      password: user.password
    });
  }
})