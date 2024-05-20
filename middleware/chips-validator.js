const validator = require('../helpers/validate');

const saveData = (req, res, next) => {
    const validationRule = {
      brand: 'required|string',
      flavor: 'required|string',
      type: 'required|string',
      production_cost: 'required|string',
      retail_price: 'required|string',
      nutritional_value: 'required|string',
      ingredients: 'required|string',
      image: 'required|string'
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