import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import './db.js';
import { seedInitialData } from './utils/seed.js';
import authRoutes from './routes/auth.js';
import entriesRoutes from './routes/entries.js';
import allowlistRoutes from './routes/allowlist.js';
import adminRoutes from './routes/admin.js';

dotenv.config();
const app = express();

app.use(morgan('dev'));
app.use(express.json({ limit: '1mb' }));

const corsOrigin = process.env.CORS_ORIGIN || '*';
app.use(cors({ origin: corsOrigin, credentials: true }));

app.get('/', (req, res) => {
  res.json({ ok: true, name: 'Ambitious Visioners Portal API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/entries', entriesRoutes);
app.use('/api/allowed-emails', allowlistRoutes);
app.use('/api/admin', adminRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API listening on port ${PORT}`));

// Seed initial admin and demo content after server starts
seedInitialData().catch(e => console.error('Seed error:', e));
