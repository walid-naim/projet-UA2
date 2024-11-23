import { Transaction, PaymentMethod } from "../Models/relation.js";
import { validationResult } from 'express-validator'; 

// Créer une nouvelle transaction
export const createTransaction = async (req, res) => {
  try {
    const { amount, date, description, paymentMethodId } = req.body;

    // Validation des entrées
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Assurez-vous que le paymentMethodId existe dans la table des méthodes de paiement
    const paymentMethod = await PaymentMethod.findByPk(paymentMethodId);
    if (!paymentMethod) {
      return res.status(400).json({ error: "Méthode de paiement invalide." });
    }

    // Création de la transaction
    const transaction = await Transaction.create({
      amount,
      date,
      description,
      paymentMethodId,
    });
    res.status(201).json(transaction);
  } catch (error) {
    console.error("Erreur lors de la création de la transaction:", error);
    res.status(500).json({ error: error.message });
  }
};

// Obtenir toutes les transactions avec pagination
export const getAllTransactions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { rows: transactions, count: totalTransactions } = await Transaction.findAndCountAll({
      offset,
      limit,
    });

    const totalPages = Math.ceil(totalTransactions / limit);

    res.status(200).json({
      page,
      limit,
      totalPages,
      totalTransactions,
      data: transactions,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des transactions:", error);
    res.status(500).json({ error: error.message });
  }
};

// Obtenir une transaction par ID
export const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id);
    if (transaction) {
      res.status(200).json(transaction);
    } else {
      res.status(404).json({ error: "Transaction non trouvée" });
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de la transaction:", error);
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour une transaction
export const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id);
    if (transaction) {
      await transaction.update(req.body);
      res.status(200).json(transaction);
    } else {
      res.status(404).json({ error: "Transaction non trouvée" });
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la transaction:", error);
    res.status(400).json({ error: error.message });
  }
};

// Supprimer une transaction
export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id);
    if (transaction) {
      await transaction.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Transaction non trouvée" });
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de la transaction:", error);
    res.status(500).json({ error: error.message });
  }
};
