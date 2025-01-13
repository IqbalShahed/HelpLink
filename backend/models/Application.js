const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  volunteer: { type: mongoose.Schema.Types.ObjectId, ref: 'Volunteer', required: true },
  opportunity: { type: mongoose.Schema.Types.ObjectId, ref: 'Opportunity', required: true },
  message: { type: String }, // Optional message from the volunteer
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }, // Application status
  createdAt: { type: Date, default: Date.now },
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
