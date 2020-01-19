/* eslint-disable no-unused-vars */
const express = require('express');
const path = require('path');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/users');


const router = express.Router();
require('dotenv').config();

/* GET home page. */
router.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/build/index.html`));
});

router.post('/signup', passport.authenticate('signup', { session: false, passReqToCallback: true }), async (req, res) => {
  if (req.error) {
    return res.status(500).json(req.error);
  }
  return res.status(200).json(req.user);
});

router.post('/login', async (req, res, next) => {
  // eslint-disable-next-line consistent-return
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error('An Error occured');
        return next(error);
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
        // We don't want to store the sensitive information such as the
        // user password in the token so we pick only the email and id
        const body = { _id: user._id, email: user.email };
        // Sign the JWT token and populate the payload with the user email and id
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET);
        // Send back the token to the user
        return res.status(200).json({ token });
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  })(req, res, next);
});


module.exports = router;
