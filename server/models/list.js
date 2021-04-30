const mongoose = require('mongoose');

const sectionSchema = require('./schemas/section');

const listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: '',
  },
  color: {
    type: String,
    required: true,
    default: 'default', // #F3F4F6
  },
  sections: {
    type: [sectionSchema],
    required: true,
    default: [],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

const List = mongoose.model('List', listSchema);

module.exports = List;
