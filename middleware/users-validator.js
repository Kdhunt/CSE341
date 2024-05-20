const validator = require('../helpers/validate');

const saveData = (req, res, next) => {
    const validationRule = {
      username: 'required|string',
      email: 'required|email',
      hashed_password: 'required|string',
      role: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };

module.exports = {
    saveData
}