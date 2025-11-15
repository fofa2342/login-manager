import express from "express";
import userController from '../controllers/userController.js';

const router = express.Router();

// Login Page
router.get('/login', userController.getLogin);

// Register Page
router.get('/register', userController.getRegister);

// Register
router.post('/register', userController.register);

// Login
router.post('/login', userController.login);

// Logout
router.get('/logout', userController.logout);

export default router;