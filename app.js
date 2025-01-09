var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRouter = require('./routes/user');
var postsRouter = require('./routes/post');
var commentsRouter = require('./routes/comment');
var relationshipRouter = require('./routes/relationship');
var savedPostsRouter = require('./routes/saved_post');
var likesRouter = require('./routes/like')
var settingsRouter = require('./routes/settings');
var profileRouter = require('./routes/profile');
var authRouter = require('./routes/auth');

const app = express();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/user', usersRouter);
app.use('/post', postsRouter);
app.use('/post', savedPostsRouter);
app.use('/post', likesRouter);
app.use('/comment', commentsRouter);
app.use('/friend', relationshipRouter);
app.use('/settings', settingsRouter);
app.use('/profile', profileRouter);
app.use('/', authRouter)

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
