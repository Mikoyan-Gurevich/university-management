const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const routes = require('./routes/index');

const app = express();
app.use(bodyParser.json());
app.use('/', routes);

// If no valid API URL, throwing 404.
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// handling 500 
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send(err.stack)
})

const server = http.createServer(app);
server.listen('3000');

module.exports = app;