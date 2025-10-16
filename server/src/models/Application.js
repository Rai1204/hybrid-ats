const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
  status: String,
  by: String,
  note: String,
  at: { type: Date, default: Date.now }
});

const ApplicationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  roleType: { type: String, enum: ['tech','non-tech'], default: 'tech' },
  applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  resume: String,
  status: { type: String, default: 'Applied' },
  history: [HistorySchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', ApplicationSchema);
