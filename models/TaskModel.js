const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      trim: true
    },
    Desc: {
      type: String,
      required: false,
      trim: true
    },
    User_id: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Task', taskSchema);

