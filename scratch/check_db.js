const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../server/.env') });
const Problem = require('../server/models/Problem');

async function check() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('MONGODB_URI is not defined in .env');
      return;
    }
    console.log('Connecting to:', mongoUri);
    await mongoose.connect(mongoUri);
    const count = await Problem.countDocuments();
    console.log(`Total Problems in Database: ${count}`);
    const problems = await Problem.find({}).limit(10);
    problems.forEach((p, idx) => {
      console.log(`[${idx + 1}] ID: ${p.problemId || 'N/A'} - Title: ${p.title} (${p.difficulty}) - Category: ${p.category} [Level: ${p.level}]`);
    });
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error connecting to DB:', err);
  }
}

check();
