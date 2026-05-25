const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  
  razorpayOrderId: { type: String, required: true },
  razorpayPaymentId: { type: String },
  razorpaySignature: { type: String },
  
  status: { type: String, enum: ['created', 'successful', 'failed'], default: 'created' },
  receipt: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
