import { body, param } from 'express-validator';

// Validator for creating a category
export const validateCreateCategory = [
  body('name')
    .notEmpty().withMessage('Le nom de la catégorie est obligatoire')
    .isString().withMessage('Le nom de la catégorie doit être une chaîne de caractères')
    .isLength({ max: 255 }).withMessage('Le nom de la catégorie ne peut pas dépasser 255 caractères'),
];

// Validator for updating a category
export const validateUpdateCategory = [
  param('id')
    .notEmpty().withMessage("L'ID de la catégorie est obligatoire")
    .isInt().withMessage("L'ID doit être un entier"),
  body('name')
    .notEmpty().withMessage('Le nom de la catégorie est obligatoire')
    .isString().withMessage('Le nom de la catégorie doit être une chaîne de caractères')
    .isLength({ max: 255 }).withMessage('Le nom de la catégorie ne peut pas dépasser 255 caractères'),
];



// Validator for deleting a category
export const validateDeleteCategory = [
  param('id')
    .notEmpty().withMessage("L'ID de la catégorie est obligatoire")
    .isInt().withMessage("L'ID doit être un entier"),
];


