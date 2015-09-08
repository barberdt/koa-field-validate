'use strict';

const bodyParser = require('koa-body');
const fieldValidator = require('./lib');
const koa = require('koa');

const app = koa();

// Middleware depends on koa-body
app.use(bodyParser());

// Use the middleware
app.use(fieldValidator());

// Middleware for handling thrown errors.
app.use(function *(next) {
  try {
    yield next;
  } catch (error) {
    const status = error.status || 500;
    const message = error.message || 'Internal server error.';
    const body = { status: status, message: message };

    if (error.fields) {
      body.fields = error.fields;
    }

    this.status = status;
    this.body = body;

    this.app.emit('error', error, this);
  }
});

// General middleware
app.use(function *() {
  // Perform validation on the required username field
  this.validate('username').isRequired();

  // Assert that this.fieldErrors does not exist, throwing 400 if it does
  this.assert(!this.fieldErrors, 400, { fields: this.fieldErrors });

  // If the assertion was true, we hav no errors
  this.body = 'No errors!';
});

app.listen(3000);
