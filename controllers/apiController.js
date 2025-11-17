import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const apiController = {
  // @desc    Register a new user
  // @route   POST /api/register
  // @access  Public
  register: async (req, res) => {
    const { name, email, password } = req.body;

    // Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

    try {
      let user = await User.findByEmail(email);
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      await User.create(name, email, password);

      res.json({ msg: 'User registered successfully.' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  // @desc    Login user
  // @route   POST /api/login
  // @access  Public
  login: async (req, res) => {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

    try {
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      const isMatch = await User.comparePassword(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
};

export default apiController;
