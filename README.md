# koa-field-validate
Parsed body field validation middleware for Koa. This is a work in progress.

## Installation
```
npm install --save koa-field-validate
```

## Usage
See `example.js` in the root of this repository for a full example of usage.

The middleware provides a `validate` function on the app context, which takes a field name as an argument. The function will return an instance of a `FieldValidator` that exposes several validation methods that can be chained. Invalidations will be populated into the app context's `fieldErrors` object, where they will be keyed by field name. Handling of the existence of `this.fieldErrors` is up to the developer's discretion.

```javascript
app.use(function *() {
  // Perform validation on the required username field
  this.validate('username').required();
  this.validate('email').required().notEmpty().email();

  // Assert that this.fieldErrors does not exist, throwing 400 if it does
  this.assert(!this.fieldErrors, 400, { fields: this.fieldErrors });

  // If the assertion was true, we have no errors
  this.body = 'No errors!';
});
```

### Current Validations
This is still a very raw middleware and is in an alpha development phase. More validations will come.

- **required(message)**
    The field must exist.

- **notEmpty(message)**
    The field must not be empty.

- **email(message)**
    The field must match a valid email regex.
