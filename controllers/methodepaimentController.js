import { PaymentMethod } from "../Models/relation.js";
import { validationResult } from 'express-validator';

// Créer une nouvelle méthode de paiement
export const createPaymentMethod = async (req, res) => {
  try {
    // Valider les données envoyées
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Créer la méthode de paiement
    const paymentMethod = await PaymentMethod.create(req.body);
    res.status(201).json(paymentMethod);
  } catch (error) {
    console.error("Error creating payment method:", error);
    res.status(500).json({ message: "Erreur lors de la création de la méthode de paiement", error: error.message });
  }
};

// Obtenir toutes les méthodes de paiement
export const getAllPaymentMethods = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { rows: paymentMethods, count: totalPaymentMethods } = await PaymentMethod.findAndCountAll({
      offset,
      limit,
    });

    const totalPages = Math.ceil(totalPaymentMethods / limit);

    res.status(200).json({
      page,
      limit,
      totalPages,
      totalPaymentMethods,
      data: paymentMethods,
    });
  } catch (error) {
    console.error("Error fetching payment methods:", error);
    res.status(500).json({ message: "Erreur lors de la récupération des méthodes de paiement", error: error.message });
  }
};

// Obtenir une méthode de paiement par ID
export const getPaymentMethodById = async (req, res) => {
  try {
    const paymentMethod = await PaymentMethod.findByPk(req.params.id);
    if (paymentMethod) {
      res.status(200).json(paymentMethod);
    } else {
      res.status(404).json({ message: "Méthode de paiement non trouvée" });
    }
  } catch (error) {
    console.error("Error fetching payment method by ID:", error);
    res.status(500).json({ message: "Erreur lors de la récupération de la méthode de paiement", error: error.message });
  }
};

// Mettre à jour une méthode de paiement
export const updatePaymentMethod = async (req, res) => {
  try {
    const paymentMethod = await PaymentMethod.findByPk(req.params.id);
    if (paymentMethod) {
      // Valider les données envoyées
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Mettre à jour la méthode de paiement
      await paymentMethod.update(req.body);
      res.status(200).json(paymentMethod);
    } else {
      res.status(404).json({ message: "Méthode de paiement non trouvée" });
    }
  } catch (error) {
    console.error("Error updating payment method:", error);
    res.status(500).json({ message: "Erreur lors de la mise à jour de la méthode de paiement", error: error.message });
  }
};

// Supprimer une méthode de paiement
export const deletePaymentMethod = async (req, res) => {
  try {
    const paymentMethod = await PaymentMethod.findByPk(req.params.id);
    if (paymentMethod) {
      await paymentMethod.destroy();
      res.status(200).json({ message: "Méthode de paiement supprimée avec succès" });
    } else {
      res.status(404).json({ message: "Méthode de paiement non trouvée" });
    }
  } catch (error) {
    console.error("Error deleting payment method:", error);
    res.status(500).json({ message: "Erreur lors de la suppression de la méthode de paiement", error: error.message });
  }
};

