import { body, param } from 'express-validator';

// Validation for creating an employee
export const validateCreateEmployee = [
  body('firstName')
    .notEmpty().withMessage('Le prénom est obligatoire')
    .isString().withMessage('Le prénom doit être une chaîne de caractères'),
  body('lastName')
    .notEmpty().withMessage('Le nom de famille est obligatoire')
    .isString().withMessage('Le nom de famille doit être une chaîne de caractères'),
  body('position')
    .optional()
    .isString().withMessage('Le poste doit être une chaîne de caractères'),
  body('salary')
    .optional()
    .isFloat({ min: 0 }).withMessage('Le salaire doit être un nombre positif'),
];

// Validation for updating an employee
export const validateUpdateEmployee = [
  body('firstName')
    .optional()
    .isString().withMessage('Le prénom doit être une chaîne de caractères'),
  body('lastName')
    .optional()
    .isString().withMessage('Le nom de famille doit être une chaîne de caractères'),
  body('position')
    .optional()
    .isString().withMessage('Le poste doit être une chaîne de caractères'),
  body('salary')
    .optional()
    .isFloat({ min: 0 }).withMessage('Le salaire doit être un nombre positif'),
];

// Validation for employee ID
export const validateEmployeeId = [
  param('id')
    .notEmpty().withMessage('L\'ID de l\'employé est obligatoire')
    .isInt().withMessage('L\'ID de l\'employé doit être un entier'),
];
