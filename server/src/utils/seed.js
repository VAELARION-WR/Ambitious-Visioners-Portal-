import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Entry from '../models/Entry.js';
import AllowedEmail from '../models/AllowedEmail.js';
import dotenv from 'dotenv';
dotenv.config();

export async function seedInitialData() {
  const email = process.env.ADMIN_SEED_EMAIL;
  const password = process.env.ADMIN_SEED_PASSWORD;
  if (!email || !password) return;

  // Seed admin
  let admin = await User.findOne({ email });
  if (!admin) {
    const passwordHash = await bcrypt.hash(password, 10);
    admin = await User.create({ name: 'Portal Admin', email, passwordHash, role: 'admin' });
    console.log('Seeded admin:', email);
  }

  // Ensure admin email is also allowed (so you can re-signup if needed)
  const existingAllowed = await AllowedEmail.findOne({ email });
  if (!existingAllowed) {
    await AllowedEmail.create({ email });
    console.log('Seeded allowed email:', email);
  }

  // Seed sample entries if empty
  const count = await Entry.countDocuments();
  if (count === 0) {
    await Entry.insertMany([
      { type: 'note', title: 'Week 1: Intro to Programming', content: 'Variables, data types, and basic I/O.', createdBy: admin._id },
      { type: 'assignment', title: 'Assignment 1: Hello World App', content: 'Build a CLI app that prints your name. Submit via portal.', dueDate: new Date(Date.now() + 7*24*60*60*1000), createdBy: admin._id },
      { type: 'diary', title: 'Day 1 Recap', content: 'Syllabus overview, onboarding Q&A, and resource links.', createdBy: admin._id },
    ]);
    console.log('Seeded sample entries.');
  }
}
