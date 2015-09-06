'use strict';

const bodyParser = require('koa-body');
const fieldValidator = require('koa-field-validate');
const koa = require('koa');

const app = koa();

app.use(bodyParser());
app.use(fieldValidator());

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

    this.app.emit('error', error, this);
  }
});

app.use(function *() {
  this.validate('username').isRequired();

  if (this.fieldErrors) {
    this.throw('Bad request.', 400, { fields: this.fieldErrors });
  }

  this.body = 'No errors!';
});

app.listen(3000);
