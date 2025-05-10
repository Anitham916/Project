const mongoose = require('mongoose');

// Add user field to moduleSchema
const moduleSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  client: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
  modules: {
    type: [moduleSchema],
    required: true,
  },
   user:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
   },

});

module.exports = mongoose.model('Project', projectSchema);
