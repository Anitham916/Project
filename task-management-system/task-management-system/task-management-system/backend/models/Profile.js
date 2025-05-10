const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  dob: { type: Date },
  mobile: { type: String },
  address: { type: String },
  avatar: { type: String },
  tasks: [{ type: String }]
});

module.exports = mongoose.model('Profile', ProfileSchema);
