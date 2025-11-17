import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import passport from 'passport';
import jwt from 'jsonwebtoken';

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
        let user = await User.findByEmail(email);
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
    const redirect_uri = req.body.redirect_uri || req.query.redirect_uri;

    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        req.flash('error_msg', info.message);
        let failureRedirect = '/users/login';
        if (redirect_uri) {
          failureRedirect += `?redirect_uri=${encodeURIComponent(redirect_uri)}`;
        }
        return res.redirect(failureRedirect);
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        
        const payload = {
          user: {
            id: user.id,
            name: user.name,
            email: user.email
          },
        };

        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) {
              req.flash('error_msg', 'Could not generate token.');
              return res.redirect('/users/login');
            }

            if (redirect_uri) {
              const separator = redirect_uri.includes('?') ? '&' : '?';
              res.redirect(`${redirect_uri}${separator}token=${token}`);
            } else {
              // Fallback: redirect to the main app's dashboard
              const APP_URL = process.env.APP_URL || 'http://localhost:2000';
              const returnTo = `${APP_URL}/dashboard`;
              const callbackUrl = `${APP_URL}/auth/callback?returnTo=${encodeURIComponent(returnTo)}&token=${token}`;
              res.redirect(callbackUrl);
            }
          }
        );
      });
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
    const { redirect_uri } = req.query;
    res.render('login', { redirect_uri });
  },

  // @desc    Display register page
  // @route   GET /users/register
  // @access  Public
  getRegister: (req, res) => {
    const { redirect_uri } = req.query;
    res.render('register', { redirect_uri });
  },
};

export default userController;
