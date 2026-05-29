const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const Problem = require('./models/Problem');

async function migrate() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('MONGODB_URI is not defined in .env');
      return;
    }
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    
    const problems = await Problem.find({}).sort({ order: 1 });
    console.log(`Found ${problems.length} problems for ID migration.`);
    
    let updatedCount = 0;
    for (let i = 0; i < problems.length; i++) {
      const p = problems[i];
      p.problemId = String(i + 1);
      await p.save();
      updatedCount++;
    }
    
    console.log(`Successfully migrated ${updatedCount} problems with sequential IDs!`);
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error during migration:', err);
  }
}

migrate();
