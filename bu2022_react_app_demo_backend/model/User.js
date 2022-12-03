const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  password: {
    type: String,
    default: true
  },
});
module.exports = Item = mongoose.model('user', UserSchema);