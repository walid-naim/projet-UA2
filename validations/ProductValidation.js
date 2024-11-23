import { body, param } from 'express-validator';

// Validation for creating a product
export const validateCreateProduct = [
  body('name')
    .notEmpty().withMessage('Le nom du produit est obligatoire')
    .isString().withMessage('Le nom doit être une chaîne de caractères'),
  body('price')
    .notEmpty().withMessage('Le prix est obligatoire')
    .isFloat({ min: 0 }).withMessage('Le prix doit être un nombre positif'),
  body('stock')
    .notEmpty().withMessage('Le stock est obligatoire')
    .isInt({ min: 0 }).withMessage('Le stock doit être un nombre entier positif'),
];

// Validation for updating a product
export const validateUpdateProduct = [
  body('name')
    .optional()
    .isString().withMessage('Le nom doit être une chaîne de caractères'),
  body('price')
    .optional()
    .isFloat({ min: 0 }).withMessage('Le prix doit être un nombre positif'),
  body('stock')
    .optional()
    .isInt({ min: 0 }).withMessage('Le stock doit être un nombre entier positif'),
];

// Validation for product ID
export const validateProductId = [
  param('id')
    .notEmpty().withMessage("L'ID du produit est obligatoire")
    .isInt().withMessage("L'ID doit être un entier"),
];

