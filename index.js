'use strict';

const FieldValidator = require('./lib/FieldValidator');


/**
 * Generator-returning function to be used with app.use. Provides the validate
 * method to the app instance.
 *
 * @return {Generator} The app middleware.
 */
module.exports = function() {

  /**
   * Generator function middleware.
   *
   * @param {Generator} next - The next middleware in the chain to yield to.
   */
  return function *(next) {
    const ctx = this;

    /**
     * Take the given field name and create and return a FieldValidator for it.
     *
     * @param {String} fieldName - The name of the field on the request body.
     * @return {FieldValidator} The field validator class for the field.
     */
    this.validate = function(fieldName) {
      // This middleware requires that koa-body has parsed the request body.
      if (!ctx.request.body) {
        ctx.throw('Validate requires a parsed body.');
      }

      return new FieldValidator(fieldName, ctx);
    };

    yield next;
  }
};
