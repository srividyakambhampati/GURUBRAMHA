const express = require('express');
const router = express.Router();
const Contest = require('../models/Contest');

// Helper to generate slug
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// 1. GET ALL CONTESTS
router.get('/', async (req, res) => {
  try {
    const contests = await Contest.find()
      .populate('problems', 'title difficulty category points')
      .populate('rankings.user', 'displayName email scholarPoints')
      .sort({ order: 1, startTime: 1 });
    res.json(contests);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch contests', details: err.message });
  }
});

// 2. GET SINGLE CONTEST
router.get('/:id', async (req, res) => {
  try {
    const contest = await Contest.findById(req.params.id)
      .populate('problems')
      .populate('rankings.user', 'displayName email scholarPoints');
    if (!contest) return res.status(404).json({ error: 'Contest not found' });
    res.json(contest);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch contest details', details: err.message });
  }
});

// 3. CREATE CONTEST
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    if (!data.slug) {
      data.slug = generateSlug(data.title) + '-' + Math.floor(1000 + Math.random() * 9000);
    }
    
    const count = await Contest.countDocuments();
    data.order = count;

    const contest = new Contest(data);
    await contest.save();
    res.status(201).json(contest);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create contest', details: err.message });
  }
});

// 4. UPDATE CONTEST
router.put('/:id', async (req, res) => {
  try {
    const data = req.body;
    if (data.title && !data.slug) {
      data.slug = generateSlug(data.title);
    }
    const contest = await Contest.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!contest) return res.status(404).json({ error: 'Contest not found' });
    res.json(contest);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update contest', details: err.message });
  }
});

// 5. DELETE CONTEST
router.delete('/:id', async (req, res) => {
  try {
    const contest = await Contest.findByIdAndDelete(req.params.id);
    if (!contest) return res.status(404).json({ error: 'Contest not found' });
    res.json({ message: 'Contest deleted successfully', id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete contest', details: err.message });
  }
});

// 6. REORDER CONTESTS
router.put('/reorder', async (req, res) => {
  try {
    const { orderedIds } = req.body;
    if (!Array.isArray(orderedIds)) {
      return res.status(400).json({ error: 'orderedIds array required' });
    }

    const bulkOps = orderedIds.map((id, index) => ({
      updateOne: {
        filter: { _id: id },
        update: { $set: { order: index } }
      }
    }));

    await Contest.bulkWrite(bulkOps);
    res.json({ message: 'Contests reordered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to reorder contests', details: err.message });
  }
});

module.exports = router;
