'use strict';

module.exports = function *(next) {

  this.validate = function(fieldName) {
    console.log('fieldName');
    // @TODO return a field validator that can be chained.
  };

  yield next;
};
