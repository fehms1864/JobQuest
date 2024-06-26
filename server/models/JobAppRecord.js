const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobAppRecordSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  link: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  dateApplied: {
    type: String,
    trim: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  deleted: { type: Boolean, default: false }, 
});

module.exports = mongoose.model('JobAppRecord', JobAppRecordSchema);