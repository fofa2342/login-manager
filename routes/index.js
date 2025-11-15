import express from "express";
import { ensureAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('welcome');
});

router.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.render('dashboard', {
    user: req.user
  });
});

export default router;