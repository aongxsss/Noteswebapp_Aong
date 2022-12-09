const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  id: {
    type: String,
    unique: true,
  },
  note: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});
module.exports = Item = mongoose.model('note_aong', NoteSchema);