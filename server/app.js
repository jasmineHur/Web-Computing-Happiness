var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("dotenv").config();
var rankingsRouter = require('./routes/rankings');
var countriesRouter = require('./routes/countries');
var factorsRouter = require('./routes/factors');
var loginRouter = require('./routes/users/login');
var registerRouter = require('./routes/users/register');
var profileRouter = require('./routes/users/profile');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json')

const options = require('./knexfile.js');
const { triggerAsyncId } = require('async_hooks');
const knex = require('knex')(options);
const helmet = require('helmet');
const cors = require('cors');

var app = express();

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
app.use((req, res, next) => {
  req.db = knex
  next()
})

app.get('/knex', function(req, res, next) {
  req.db.raw("SELECT VERSION()"). then(
    (version) => console.log((version[0][0]))
  ).catch((err) => {console.log(err); throw err})
    res.send("Version Logged successfully");
});

app.use(logger('common')); 
app.use(helmet()); 
app.use(cors());
 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/rankings', rankingsRouter);
app.use('/countries', countriesRouter);
app.use('/', loginRouter);
app.use('/', registerRouter);
app.use('/', profileRouter);
app.use('/factors', factorsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
