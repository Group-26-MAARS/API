// Passport JWT auth following this guide:
// https://scotch.io/@devGson/api-authentication-with-json-web-tokensjwt-and-passport

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const JWTstrategy = require('passport-jwt').Strategy;

// We use this to extract the JWT sent by the user
const ExtractJWT = require('passport-jwt').ExtractJwt;

const UserModel = require('../../models/users');
require('dotenv').config();

// Create a passport middleware to handle user registration
passport.use('signup', new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
}, async (req, email, password, done) => {
  try {
    // Save the information provided by the user to the the database
    const user = await UserModel.create(req.body);
    // Send the user information to the next middleware
    req.user = user;
    return done(null, user);
  } catch (error) {
    req.error = error;
    return done(error);
  }
}));

// Create a passport middleware to handle User login
passport.use('login', new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
}, async (req, email, password, done) => {
  try {
    // Find the user associated with the email provided by the user
    const user = await UserModel.findOne({ email });
    if (!user) {
      req.error = { message: 'User not found' };
      // If the user isn't found in the database, return a message
      return done(null, false, { message: 'User not found' });
    }
    // Validate password and make sure it matches with the corresponding hash stored in the database
    // If the passwords match, it returns a value of true.
    const validate = await user.isValidPassword(password);
    if (!validate) {
      return done(null, false, { message: 'Wrong Password' });
    }
    // Send the user information to the next middleware
    req.user = user;
    return done(null, user, { message: 'Logged in Successfully' });
  } catch (error) {
    return done(error);
  }
}));

// This verifies that the token sent by the user is valid
passport.use(new JWTstrategy({
  // secret we used to sign our JWT
  secretOrKey: process.env.JWT_SECRET,
  // we expect the user to send the token in the Authorization field of the header
  // (usintg the Bearer schema.)
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
}, async (token, done) => {
  try {
    // Pass the user details to the next middleware
    console.log('token');
    return done(null, token.user);
  } catch (error) {
    return done(error);
  }
}));
