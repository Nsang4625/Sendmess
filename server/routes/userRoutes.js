const express = require('express');
const { register, auth } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const userRoutes = express.Router();
userRoutes.route('/').post(register).get(protect, allUsers);
userRoutes.route('/login').post(auth);

module.exports = userRoutes;