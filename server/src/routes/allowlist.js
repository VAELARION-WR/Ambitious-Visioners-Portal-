import express from 'express';
import AllowedEmail from '../models/AllowedEmail.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const items = await AllowedEmail.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (e) { next(e); }
});

router.post('/', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email required' });
    const item = await AllowedEmail.create({ email: email.toLowerCase() });
    res.status(201).json(item);
  } catch (e) { 
    if (e.code === 11000) return res.status(400).json({ error: 'Email already allowed' });
    next(e); 
  }
});

router.delete('/:id', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    await AllowedEmail.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (e) { next(e); }
});

export default router;
