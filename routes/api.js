import express from 'express';
import apiController from '../controllers/apiController.js';

const router = express.Router();

// @route   POST api/register
// @desc    Register user
// @access  Public
router.post('/register', apiController.register);

// @route   POST api/login
// @desc    Login user and return JWT
// @access  Public
router.post('/login', apiController.login);

export default router;
