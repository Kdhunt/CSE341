const validator = require('../helpers/validate');

const saveData = (req, res, next) => {
    const validationRule = {
      firstName: 'required|string',
      brand: 'required|string',
      flavor: 'required|string',
      type: 'required|string',
      production_cost: 'required|number',
      retail_price: 'required|number',
      nutritional_value: 'required|json',
      ingredients: 'required|array',
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