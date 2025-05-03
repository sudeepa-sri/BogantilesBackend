const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,  // Reference to User's _id
    ref: 'User',  // Reference the User model
    required: true
  },
  tiles: [
    {
      tileId: { 
        type: mongoose.Schema.Types.ObjectId,  // Reference to tile
        ref: 'Tile', 
        required: true 
      },
      quantity: { 
        type: Number, 
        required: true 
      }
    }
  ]
});

module.exports = mongoose.model('Cart', cartSchema);
