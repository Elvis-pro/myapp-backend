const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  ip: String,
  path: String,
  method: String,
  userAgent: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Visitor', visitorSchema);
