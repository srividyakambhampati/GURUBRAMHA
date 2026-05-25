const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  duration: { type: String },
  videoUrl: { type: String },
  isFreePreview: { type: Boolean, default: false }
});

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  instructor: { type: String, required: true },
  category: { type: String, required: true },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
  duration: { type: String }, // e.g., "45:00"
  
  rating: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 },
  studentsEnrolled: { type: Number, default: 0 },
  
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  thumbnail: { type: String },
  description: { type: String },
  
  lessons: [lessonSchema]
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
