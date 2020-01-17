const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  ID: Number,
  dateOfLastService: { type: Date, default: Date.now },
  daysOver: { type: Number, default: 0 },
  qrCode: Object,
});

module.exports = mongoose.model('Equipment', equipmentSchema);
