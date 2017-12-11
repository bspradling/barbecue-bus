'use strict'

const HttpStatus = require('http-status');

var ErrorEntity = function(statusCode, message, fields, stack) {
  this.statusCode = statusCode;
  this.errorEntity = new ErrorBodyEntity(HttpStatus[statusCode], message, fields, stack)
}

var ErrorBodyEntity = function(error, message, fields) {
  this.error = error;
  this.message = message;
  this.fields = fields;
}

var ErrorFieldEntity = function(path, message) {
  this.path = path;
  this.message = message;
}

module.exports = {
  ErrorEntity: ErrorEntity,
  ErrorBodyEntity: ErrorBodyEntity,
  ErrorFieldEntity: ErrorFieldEntity
}