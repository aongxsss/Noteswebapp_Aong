const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  note: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
});
module.exports = Item = mongoose.model('note', NoteSchema);