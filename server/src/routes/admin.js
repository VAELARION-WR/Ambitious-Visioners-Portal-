import express from 'express';
import { requireAuth, requireAdmin } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// List pending users
router.get('/pending-users', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const users = await User.find({ role: 'pending' }).sort({ createdAt: -1 });
    res.json(users.map(u => ({ id: u._id, name: u.name, email: u.email, role: u.role })));
  } catch (e) { next(e); }
});

// Approve: set role to student or admin
router.put('/approve/:id', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const { role } = req.body; // 'student' or 'admin'
    if (!['student', 'admin'].includes(role)) return res.status(400).json({ error: 'Invalid role' });
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
    res.json({ id: user._id, name: user.name, email: user.email, role: user.role });
  } catch (e) { next(e); }
});

// List all users (optional)
router.get('/users', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users.map(u => ({ id: u._id, name: u.name, email: u.email, role: u.role })));
  } catch (e) { next(e); }
});

export default router;
