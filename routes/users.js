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

router.post('/new', (req, res) => {
  const {
    firstName, lastName, email, totalTimeAllActivities,
    jobTitile,
    password,
    username,
    ID,
  } = req.body;

  const newUser = new User({
    firstName,
    lastName,
    email,
    totalTimeAllActivities,
    jobTitile,
    password,
    username,
    ID,
  });

  newUser.save((err, product) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(product);
  });
});

module.exports = router;
