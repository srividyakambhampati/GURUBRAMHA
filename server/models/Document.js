const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  digilockerId: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String }, // e.g., 'Aadhar', 'Marksheet'
  uri: { type: String, required: true },
  issueDate: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Document', documentSchema);
