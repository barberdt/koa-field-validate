'use strict';


/**
 * A class used to validate a given field on the app's request body.
 */
module.exports = class {
  /**
   * @param {String} name - The name of the field being validated.
   * @param {Object} app - The Koa app instance.
   */
  constructor(name, app) {
    this.name = name;
    this.value = app.request.body[name];
    this.hasValue = this.value !== undefined && this.value !== null;
    this.errors = [];
    this.app = app;
    this.done = false;
  }

  /**
   * Validate the existence of a the field.
   *
   * @param {String} message - An optional message override.
   * @return {Object} this to chain with.
   */
  required(message) {
    if (this.done) {
      return this;
    }

    message = (message === undefined) ? 'is required' : message;

    if (!this.hasValue) {
      this.emitError(message);
      return this;
    }

    return this;
  }

  /**
   * Validate that the field is not empty.
   *
   * @param {String} message - An optional message override.
   * @return {Object} this to chain with.
   */
  notEmpty(message) {
    if (this.done || !this.hasValue) {
      return this;
    }

    message = (message === undefined) ? 'cannot be empty' : message;

    const type = typeof this.value;

    if (!this.hasValue ||
        Array.isArray(this.value) && this.value.length === 0 ||
        type === 'string' && this.value === '' ||
        type === 'object' && Object.keys(this.value).length === 0) {

      this.emitError(message);
    }

    return this;
  }

  /**
   * Validate that the field is a valid email address.
   *
   * @param {String} message - An optional message override.
   * @return {Object} this to chain with.
   */
  email(message) {
    if (this.done || !this.hasValue) {
      return this;
    }

    message = (message == undefined) ? 'must be a valid email address' : message;

    const re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

    if (!re.test(this.value)) {
      this.emitError(message);
    }

    return this;
  }

  /**
   * A private method used to add the given error to the app instance's field
   * errors, keyed by the field's name.
   *
   * @param {String} error - The error messge to add.
   */
  emitError(message) {
    // Ensure existing fieldErrors object.
    if (!this.app.fieldErrors) {
      this.app.fieldErrors = {};
    }

    // Set fieldErrors[name].
    this.app.fieldErrors[this.name] = message;

    // We're done here.
    this.done = true;
  }
}
