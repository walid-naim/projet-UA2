import { body, param } from 'express-validator';

export const validateCreateCommande = [
  body('clientId')
    .notEmpty().withMessage('L\'ID du client est obligatoire')
    .isInt().withMessage('L\'ID du client doit être un entier'),
  body('products')
    .notEmpty().withMessage('La liste des produits est obligatoire')
    .isArray().withMessage('Les produits doivent être sous forme de tableau'),
  body('total')
    .notEmpty().withMessage('Le montant total est obligatoire')
    .isFloat({ min: 0 }).withMessage('Le montant total doit être un nombre positif'),
];

export const validateCommandeId = [
  param('id')
    .notEmpty().withMessage("L'ID de la commande est obligatoire")
    .isInt().withMessage("L'ID doit être un entier"),
  ];
export const validateUpdateCommande = [
  body('clientId')
    .optional()
    .isInt().withMessage('L\'ID du client doit être un entier'),
  body('products')
    .optional()
    .isArray().withMessage('Les produits doivent être sous forme de tableau'),
  body('total')
    .optional()
    .isFloat({ min: 0 }).withMessage('Le montant total doit être un nombre positif'),
];

