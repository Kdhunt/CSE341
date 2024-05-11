const { body, validationResult } = require('express-validator')
const checkAddContactValidationRules = () => {
  return [
    body('firstname').not().isEmpty().withMessage('First name is required'),
    body('lastname').not().isEmpty().withMessage('Last name is required'),
    body('email').not().isEmpty().isEmail().withMessage('Email must be a valid email'),
    body('favoriteColor').not().isEmpty().withMessage('Favorite color is required'),
    body('birthday').not().isEmpty().isDate().withMessage('Birthday must be a valid date')
  ]
}
const checkUpdateContactValidationRules = () => {
    return [
      body('firstname').not().isEmpty().withMessage('First name is required'),
      body('lastname').not().isEmpty().withMessage('Last name is required'),
      body('email').not().isEmpty().isEmail().withMessage('Email must be a valid email'),
      body('favoriteColor').not().isEmpty().withMessage('Favorite color is required'),
      body('birthday').not().isEmpty().isDate().withMessage('Birthday must be a valid date')
    ]
  }
  const getContactValidationRules = () => {
    return [
      body('_id').not().isEmpty().withMessage('ID is required'),
    ]
  }
  const deleteontactValidationRules = () => {
    return [
      body('_id').not().isEmpty().withMessage('ID is required'),
    ]
  }

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
    addContactValidationRules,
  validate,
}