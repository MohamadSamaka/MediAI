const mongoose = require('mongoose');
const locationSchema = new mongoose.Schema({location: [{ type: String, required: true }]});
module.exports = mongoose.model('location', locationSchema);