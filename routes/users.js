const express = require('express');

const router = express.Router();

const User = require('../models/users');

router.get('/', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res.status(200).json(users);
  });
});

module.exports = router;
