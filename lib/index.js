'use strict';

const FieldValidator = require('./FieldValidator');


module.exports = function() {
  return function *(next) {
    const ctx = this;

    this.validate = function(fieldName) {
      if (!ctx.request.body) {
        ctx.throw('Validate requires a parsed body.');
      }

      return new FieldValidator(fieldName, ctx);
    };

    yield next;
  }
};
