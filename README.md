# Ambitious Visioners Portal — Allowlist + Approvals

A full-stack portal for **Ambitious Visioners Portal** with:
- Email **allowlist** (admin-managed in the UI)
- **Pending → Approved** user workflow
- **Admin seeding** for first login
- Notes / Assignments / Daily Diary + smooth animations

## Tech Stack
- **Frontend**: React (Vite) + Tailwind CSS + Framer Motion + React Router
- **Backend**: Node.js + Express + MongoDB (Mongoose) + JWT + bcrypt
- **Deploy**: Vercel (client), Render (server), MongoDB Atlas (DB)

## Quick Start (Local)

### 1) MongoDB Atlas
Create a free cluster and get your connection string.

### 2) Backend
```bash
cd server
cp .env.example .env
# Edit .env (MONGO_URI, JWT_SECRET). Admin seed is pre-filled for your email.
npm install
npm run dev
```

### 3) Frontend
```bash
cd client
cp .env.example .env
# Set VITE_API_URL to your backend URL (e.g. http://localhost:5000)
npm install
npm run dev
```

Open http://localhost:5173

### Seeded Admin (first login)
- **Email**: vaelarion14@gmail.com
- **Password**: Admin@123
> Change this after first login. The server seeds this admin if it does not already exist.

## Deploy

### Backend → Render
- Root Directory: `server`
- Build: `npm install`
- Start: `npm start`
- Environment Variables: copy from `server/.env.example`

### Frontend → Vercel
- Root Directory: `client`
- Env: `VITE_API_URL` = your Render backend URL

## Admin Panel
- **Entries**: create/edit/delete notes, assignments (with due dates), daily diary
- **Users**: approve pending users → assign role (student/admin)
- **Allowed Emails**: add/remove allowed emails (controls who can sign up)

## Signup Flow
1. User signs up with email/password
2. Backend checks **AllowedEmail** collection
   - Not found → **403 Not allowed**
   - Found → user created with role **pending**
3. Admin approves → role becomes **student** or **admin**

Enjoy! 🚀
