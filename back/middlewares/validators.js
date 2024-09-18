const { body, validationResult, param } = require('express-validator');
const { modelDataTypes } = require('../utils/filters');
const CustomError = require('../utils/customError');
let { playerProvider } = require('../providers');

const myValidationResult = validationResult.withDefaults({
  formatter: (error) => error.msg,
});
/**
 * To get only the error message, no the default response
 * {"errors": [{
 *       "type": "field",
 *       "value": "1000000",
 *       "msg": "Unable to process the request, invalid input",
 *       "path": "id",
 *       "location": "params"
 *       }]
 *   }
 */

const validateFields = (validations) => async (req, res, next) => {
  for (const validation of validations) {
    const result = await validation.run(req);
    if (result.errors.length) break;
  }

  const errors = myValidationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  res.status(400).json({ errors: errors.array() });
  return;
};

//Check user input to login
const checkUserLogIn = validateFields([
  body().notEmpty().withMessage('Unable to process the request, invalid input'),
  body('email', 'Must be a valid e-mail address').isEmail().notEmpty(),
  body('password', 'The password must be at least 8 characters, and must contain a symbol')
    .notEmpty()
    .isStrongPassword(),
]);

//Check players id param
let maxCountPlayer = playerProvider.countPlayers();
const checkPlayerIdParamSent = validateFields([
  param('id')
    .isInt({ min: 1, max: maxCountPlayer })
    .withMessage('Unable to process the request, invalid input'),
]);

//Middleware to check Players data before creating or updating any record
/**
 * @requires
 * @argument isNew: will validate whether is a new record or
 *                  modifications (true) of a previous record (false).
 * @argument newPlayer: fields to validate in this middleware
 *
 * @returns model parameters OK || errors
 */
const checkPlayerInput = (req, res, next) => {
  let { newPlayer, isNew } = req.body;
  const arrayError = [];

  // Check if the req.body is empty or the fields newPlayer or isNew
  if (!req.body || !newPlayer || isNew === null) {
    res.status(400).json({ error: 'Unable to process the request' });
    return;
  }
  // 1. Check fields in the req.body
  Object.entries(newPlayer).forEach(([key, value]) => {
    const field = modelDataTypes.find((obj) => obj.name === key);

    if (field) {
      // if founded, can it be null?
      if (field.allowNull === false && (value === null || value === '')) {
        arrayError.push(`Field ${key} cannot be null`);
      }

      // Validate correct data type
      const isTypeValid =
        (field.type === 'string' && typeof value === 'string') ||
        (field.type === 'number' && typeof value === 'number');

      if (!isTypeValid) {
        arrayError.push(
          `The field ${key} must be ${field.type === 'string' ? 'words' : 'numbers'}`
        );
      }
    } else {
      // If field doesn´t exist in modelDataTypes
      arrayError.push(`${key} is not allowed`);
    }
  });

  // 2. Check missing model columns with no allowed null values
  if (isNew) {
    modelDataTypes.forEach((field) => {
      if (field.allowNull === false && !(field.name in newPlayer)) {
        arrayError.push(`Field ${field.name} is mandatory`);
      }
    });
  }

  if (arrayError.length > 0) {
    res.status(400).json({ error: arrayError });
    return;
  } else {
    return next();
  }
};

module.exports = {
  validateFields,
  checkUserLogIn,
  checkPlayerInput,
  checkPlayerIdParamSent,
};
