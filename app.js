const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');

require('dotenv').config();
require('./middleware/auth');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const equipmentRouter = require('./routes/equipment');

const app = express();

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));

app.use('/', indexRouter);

// We plugin our jwt strategy as a middleware so only verified users can access these routes.
// passReqToCallback: https://stackoverflow.com/a/55920735
app.use('/users', passport.authenticate('jwt', { session: false, passReqToCallback: true }), usersRouter);

app.use('/equipment', equipmentRouter);

module.exports = app;
