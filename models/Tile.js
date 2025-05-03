
const mongoose = require('mongoose');

const tileSchema = new mongoose.Schema({
  name: String,
  shortDescription: String,
  description: String,
  price: Number,
  size: String,
  material: String,
  finish: String,
  color: String,
  category: String,
  imageUrl: String,
  isFastSelling: {
    type: Boolean,
    default: false, // If not checked, it defaults to false
  },
  isTrending: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Tile', tileSchema);
