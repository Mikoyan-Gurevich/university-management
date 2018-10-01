const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const routes = require('./routes');

const app = express();
app.use(bodyParser.json());
routes(app);

// If no valid API URL, throwing 404.
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// TODO - what are below two functions
app.use(bodyParser.urlencoded({ extended: false }));
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.code || 500)
      .json({
        status: 'error',
        message: err
      });
  });
}
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
    .json({
      status: 'error',
      message: err.message
    });
});

const server = http.createServer(app);
server.listen('3000');

module.exports = app;