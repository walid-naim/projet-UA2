import { body, param } from 'express-validator';

// Validation for creating a transaction
export const validateCreateTransaction = [
  body('amount')
    .notEmpty().withMessage('Le montant est requis')
    .isFloat({ min: 0 }).withMessage('Le montant doit être un nombre positif'),
  body('date')
    .notEmpty().withMessage('La date est requise')
    .isDate().withMessage('La date doit être au format valide (YYYY-MM-DD)'),
  body('paymentMethodId')
    .notEmpty().withMessage("L'ID de la méthode de paiement est requis")
    .isInt().withMessage("L'ID de la méthode de paiement doit être un entier"),
];

// Validation for updating a transaction
export const validateUpdateTransaction = [
  body('amount')
    .optional()
    .isFloat({ min: 0 }).withMessage('Le montant doit être un nombre positif'),
  body('date')
    .optional()
    .isDate().withMessage('La date doit être au format valide (YYYY-MM-DD)'),
  body('paymentMethodId')
    .optional()
    .isInt().withMessage("L'ID de la méthode de paiement doit être un entier"),
];

// Validation for transaction ID
export const validateTransactionId = [
  param('id')
    .notEmpty().withMessage('L\'ID de la transaction est requis')
    .isInt().withMessage('L\'ID doit être un entier'),
];
