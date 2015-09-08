'use strict';


/**
 * A class used to validate a given field on the app's request body.
 */
module.exports = class {
  /**
   * @param {String} fieldName - The name of the field being validated.
   * @param {Object} app - The Koa app instance.
   */
  constructor(fieldName, app) {
    this.fieldName = fieldName;
    this.fields = app.request.body;
    this.errors = [];
    this.app = app;
  }

  /**
   * Validate the existence of a required field.
   *
   * @return {Object} this to chain with.
   */
  isRequired() {
    const fieldValue = this.fields[this.fieldName];

    if (!fieldValue || fieldValue === '') {
      this.addError(`${this.fieldName} is required.`);
    }

    return this;
  }

  /**
   * A private method used to add the given error message to the app instance's
   * fieldErrors for the current instance's field name.
   *
   * @param {String} error - The error messge to add.
   */
  addError(error) {
    this.errors.push(error);

    // Ensure existing fieldErrors object.
    if (!this.app.fieldErrors) {
      this.app.fieldErrors = {};
    }

    // Set fieldErrors[fieldName] if it does not exist.
    if (!this.app.fieldErrors[this.fieldName]) {
      this.app.fieldErrors[this.fieldName] = this.errors;
    }
  }
}
