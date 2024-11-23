import { body, param } from 'express-validator';

// Validator for creating a client
export const validateCreateClient = [
  body('firstName')
    .notEmpty().withMessage('First name is required')
    .isString().withMessage('First name must be a string')
    .isLength({ max: 100 }).withMessage('First name cannot exceed 100 characters'),
  body('lastName')
    .notEmpty().withMessage('Last name is required')
    .isString().withMessage('Last name must be a string')
    .isLength({ max: 100 }).withMessage('Last name cannot exceed 100 characters'),
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format'),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isString().withMessage('Password must be a string')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/\d/).withMessage('Password must contain at least one number')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/[@$!%*?&]/).withMessage('Password must contain at least one special character (@, $, !, %, *, ?, &)'),
  body('phone')
    .optional()
    .isString().withMessage('Phone number must be a string')
    .isLength({ max: 15 }).withMessage('Phone number cannot exceed 15 characters'),
  body('address')
    .optional()
    .isString().withMessage('Address must be a string')
    .isLength({ max: 255 }).withMessage('Address cannot exceed 255 characters'),
];

// Validator for updating a client
export const validateUpdateClient = [
  param('id')
    .notEmpty().withMessage('Client ID is required')
    .isInt().withMessage('Client ID must be an integer'),
  body('firstName')
    .optional()
    .isString().withMessage('First name must be a string')
    .isLength({ max: 100 }).withMessage('First name cannot exceed 100 characters'),
  body('lastName')
    .optional()
    .isString().withMessage('Last name must be a string')
    .isLength({ max: 100 }).withMessage('Last name cannot exceed 100 characters'),
  body('email')
    .optional()
    .isEmail().withMessage('Invalid email format'),
  body('password')
    .optional()
    .isString().withMessage('Password must be a string')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/\d/).withMessage('Password must contain at least one number')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/[@$!%*?&]/).withMessage('Password must contain at least one special character (@, $, !, %, *, ?, &)'),
  body('phone')
    .optional()
    .isString().withMessage('Phone number must be a string')
    .isLength({ max: 15 }).withMessage('Phone number cannot exceed 15 characters'),
  body('address')
    .optional()
    .isString().withMessage('Address must be a string')
    .isLength({ max: 255 }).withMessage('Address cannot exceed 255 characters'),
];

// Validator for deleting a client
export const validateDeleteClient = [
  param('id')
    .notEmpty().withMessage('Client ID is required')
    .isInt().withMessage('Client ID must be an integer'),
];

// Middleware to handle validation errors
import { validationResult } from 'express-validator';

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
