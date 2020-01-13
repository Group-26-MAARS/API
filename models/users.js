const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  totalTimeAllActivities: Number,
  jobTitile: String,
  password: String,
  username: String,
  ID: Number,

// TODO: make Procedures Foreign Keys
//   Procedure: <ProcedureGeneration>
});

module.exports = mongoose.model('User', userSchema);
