'use strict';

const util = require('util');
const errorMap = require('./errorMap');

const ApiError = function (eCode, opts) {
  this.eCode = eCode;
  const mappedError = errorMap.codeMap[eCode] || {};
  this.httpStatusCode = mappedError.status || 400;
  const message = mappedError.message || "Some error occured";
  Object.keys(opts || {}).forEach((key) => {
    message = message.replace(`<${key}>`, opts[key]);
  });
  this.message = message;
  Error.captureStackTrace(this, ApiError);
};

util.inherits(ApiError, Error);

module.exports = ApiError;