import express from 'express';
import Entry from '../models/Entry.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', requireAuth, async (req, res, next) => {
  try {
    const { type } = req.query;
    const query = type ? { type } : {};
    const entries = await Entry.find(query).sort({ createdAt: -1 });
    res.json(entries);
  } catch (e) { next(e); }
});

router.post('/', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const { type, title, content, dueDate } = req.body;
    const entry = await Entry.create({ type, title, content, dueDate, createdBy: req.user.id });
    res.status(201).json(entry);
  } catch (e) { next(e); }
});

router.put('/:id', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { type, title, content, dueDate } = req.body;
    const updated = await Entry.findByIdAndUpdate(id, { type, title, content, dueDate }, { new: true });
    res.json(updated);
  } catch (e) { next(e); }
});

router.delete('/:id', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    await Entry.findByIdAndDelete(id);
    res.json({ ok: true });
  } catch (e) { next(e); }
});

export default router;
