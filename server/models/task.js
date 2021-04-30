const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: '',
  },
  complete: {
    type: Boolean,
    default: false,
  },
  notes: {
    type: String,
    default: '',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  lists: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }],
    require: true,
  },
  // sections: {
  //   type: [{ type: Schema.Types.ObjectId, ref: 'Section' }],
  //   require: true,
  // },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
