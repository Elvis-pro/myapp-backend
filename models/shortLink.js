const mongoose = require('mongoose');

const shortLinkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  fullUrls: { type: [String], required: true }, // Array of URLs
  slug: { type: String, required: true, unique: true },
  clicks: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('ShortLink', shortLinkSchema);
