import { body, param } from 'express-validator';

// Validation for creating a payment method
export const validateCreatePaymentMethod = [
  body('method')
    .notEmpty().withMessage('Le nom de la méthode de paiement est obligatoire')
    .isString().withMessage('Le nom de la méthode de paiement doit être une chaîne de caractères'),
  body('details')
    .optional()
    .isString().withMessage('Les détails doivent être une chaîne de caractères'),
];

// Validation for updating a payment method
export const validateUpdatePaymentMethod = [
  body('method')
    .optional()
    .isString().withMessage('Le nom de la méthode de paiement doit être une chaîne de caractères'),
  body('details')
    .optional()
    .isString().withMessage('Les détails doivent être une chaîne de caractères'),
];

// Validation for payment method ID
export const validatePaymentMethodId = [
  param('id')
    .notEmpty().withMessage("L'ID de la méthode de paiement est obligatoire")
    .isInt().withMessage("L'ID de la méthode de paiement doit être un entier"),
];
