const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

module.exports = mongoose.model('User', userSchema, 'login'); 
// This connects to the 'login' table in 'Bogantiles' DB
