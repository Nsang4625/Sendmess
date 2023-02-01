const express = require('express');
const { register, auth } = require('../controllers/userController');

const userRoutes = express.Router();
userRoutes.route('/').post(register);
userRoutes.route('/login').post(auth);

module.exports = userRoutes;