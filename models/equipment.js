const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  ID: Number,
  dateOfLastService: { type: Date, default: Date.now },
  daysOver: { type: Number, default: 0 },
});

module.exports = mongoose.model('Equipment', equipmentSchema);
