'use strict';


module.exports = class {
  constructor(fieldName, ctx) {
    this.fieldName = fieldName;
    this.fields = ctx.request.body;
    this.errors = [];
    this.ctx = ctx;
  }

  isRequired() {
    if (!this.fields.hasOwnProperty(this.fieldName)) {
      this.addError(`${this.fieldName} is required.`);
    }
  }

  addError(error) {
    this.errors.push(error);

    // Ensure existing fieldErrors object.
    if (!this.ctx.fieldErrors) {
      this.ctx.fieldErrors = {};
    }

    // Set fieldErrors[fieldName] if it does not exist.
    if (!this.ctx.fieldErrors[this.fieldName]) {
      this.ctx.fieldErrors[this.fieldName] = this.errors;
    }
  }
}
