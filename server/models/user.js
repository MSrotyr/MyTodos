const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    default: '',
  },
  lastName: {
    type: String,
    required: true,
    default: '',
  },
  email: {
    type: String,
    required: true,
    default: '',
  },
  password: {
    type: String,
    required: true,
    default: '',
  },
  lists: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }],
    required: true,
    default: [],
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
