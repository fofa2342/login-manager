import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import passport from 'passport';

const userController = {
  // @desc    Register a new user
  // @route   POST /users/register
  // @access  Public
  register: async (req, res) => {
    const { name, email, password, password2 } = req.body;
    const errors = [];

    // Check required fields
    if (!name || !email || !password || !password2) {
      errors.push({ msg: 'Please fill in all fields' });
    }

    // Check passwords match
    if (password !== password2) {
      errors.push({ msg: 'Passwords do not match' });
    }

    // Check password length
    if (password.length < 6) {
      errors.push({ msg: 'Password should be at least 6 characters' });
    }

    if (errors.length > 0) {
      res.render('register', {
        errors,
        name,
        email,
        password,
        password2,
      });
    } else {
      try {
        const user = await User.findByEmail(email);
        if (user) {
          errors.push({ msg: 'Email is already registered' });
          res.render('register', {
            errors,
            name,
            email,
            password,
            password2,
          });
        } else {
          await User.create(name, email, password);
          req.flash('success_msg', 'You are now registered and can log in');
          res.redirect('/users/login');
        }
      } catch (err) {
        console.error(err);
        res.render('register', {
          errors: [{ msg: 'Something went wrong' }],
          name,
          email,
          password,
          password2,
        });
      }
    }
  },

  // @desc    Login user
  // @route   POST /users/login
  // @access  Public
  login: (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/users/login',
      failureFlash: true,
    })(req, res, next);
  },

  // @desc    Logout user
  // @route   GET /users/logout
  // @access  Private
  
  logout: (req, res) => {
    req.logout(function(err) {
      if (err) { return next(err); }
      req.flash('success_msg', 'You are logged out');
      res.redirect('/users/login');
    });
  },

  // @desc    Display login page
  // @route   GET /users/login
  // @access  Public
  getLogin: (req, res) => {
    res.render('login');
  },

  // @desc    Display register page
  // @route   GET /users/register
  // @access  Public
  getRegister: (req, res) => {
    res.render('register');
  },
};

export default userController;
