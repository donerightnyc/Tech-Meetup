const ar = require('express').Router();
const authController = require('../controllers/authController');

// if user is not authenticated
ar.get('/', authController.restrict, (req, res) => res.json({
  user: res.locals.user
}));

// /register is the path when user is going to
ar.post('/register', authController.register);
ar.post('/login', authController.login);

module.exports = ar;
