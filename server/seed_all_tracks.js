const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();
const Problem = require('./models/Problem');

async function seed() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('MONGODB_URI is not defined in .env');
      return;
    }
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUri);

    // Clear existing
    const deleteRes = await Problem.deleteMany({});
    console.log(`Cleared ${deleteRes.deletedCount} existing problems from database.`);

    // Read config JSON
    const dbPath = path.join(__dirname, 'config/leetcode_problems_db.json');
    const raw = fs.readFileSync(dbPath, 'utf8');
    const problemsData = JSON.parse(raw);

    // Populate order and map properties
    for (let i = 0; i < problemsData.length; i++) {
      const prob = problemsData[i];
      prob.slug = prob.slug || prob.title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
      prob.order = i;
      prob.points = prob.points || 100;
      prob.accuracy = prob.accuracy || 72.5;
      prob.status = 'Published';
    }

    const insertRes = await Problem.insertMany(problemsData);
    console.log(`Successfully seeded ${insertRes.length} comprehensive problems representing all 7 tracks!`);

    await mongoose.disconnect();
    console.log('Database disconnected successfully.');
  } catch (err) {
    console.error('Seeding error:', err);
  }
}

seed();
