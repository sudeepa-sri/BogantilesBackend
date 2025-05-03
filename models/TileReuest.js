// models/TileRequest.js
// const mongoose = require('mongoose');

// const tileRequestSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   phone: {
//     type: String,
//     required: true,
//   },
//   contactTime: {
//     type: String,
//     enum: ['Morning', 'Afternoon', 'Evening'],
//     required: true,
//   },
//   city: {
//     type: String,
//     default: 'Namakkal',
//   },
//   taluk: {
//     type: String,
//     required: true,
//   },
//   locationText: {
//     type: String,
//     required: true,
//   },
//   message: {
//     type: String,
//     default: '',
//   },
  
//     status: {
//         type: String,
//         enum: ["Pending", "Contacted"],
//         default: "Pending",
//       },
 
//   requestDate: {
//     type: Date,
//     default: Date.now,
//   },
//   tiles: [
//     {
//       tileId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Tile', // Assuming you have a Tile model that stores tile details
//         required: true,
//       },
//       quantity: {
//         type: Number,
//         required: true,
//         default: 1,
//       },
//     },
//   ],
// });

// const TileRequest = mongoose.model('TileRequest', tileRequestSchema);

// module.exports = TileRequest;


const mongoose = require('mongoose');

const tileRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  contactTime: {
    type: String,
    enum: ['Morning', 'Afternoon', 'Evening'],
    required: true,
  },
  city: { type: String, default: 'Namakkal' },
  taluk: { type: String, required: true },
  locationText: { type: String, required: true },
  message: { type: String, default: '' },
  status: {
    type: String,
    enum: ['Pending', 'Contacted'],
    default: 'Pending',
  },
  requestDate: { type: Date, default: Date.now },
  tiles: [
    {
      tileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tile',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
  referenceImages: [String], // <-- Add this
});

const TileRequest = mongoose.model('TileRequest', tileRequestSchema);
module.exports = TileRequest;
