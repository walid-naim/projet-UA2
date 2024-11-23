import { Order } from "../Models/relation.js";
import { OrderDetail } from "../Models/relation.js";
import { validationResult } from 'express-validator';

// Créer une commande
export const createOrder = async (req, res) => {
  try {
    // Gérer les erreurs de validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { status, details } = req.body; // `details` est un tableau d'articles de commande
    const newOrder = await Order.create({ status });

    if (details && details.length > 0) {
      const orderDetails = details.map((detail) => ({
        ...detail,
        ID_commande: newOrder.id, // Lier aux détails de commande
      }));
      await OrderDetail.bulkCreate(orderDetails);
    }

    res.status(201).json({ message: "Commande créée avec succès", newOrder });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de la commande", error: error.message });
  }
};

// Obtenir toutes les commandes avec pagination
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: OrderDetail,
          attributes: ["quantity", "unitPrice"],
        },
      ],
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des commandes", error: error.message });
  }
};

// Obtenir une commande par ID
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id, {
      include: [
        {
          model: OrderDetail,
          attributes: ["quantity", "unitPrice"],
        },
      ],
    });

    if (!order) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de la commande", error: error.message });
  }
};

// Mettre à jour une commande par ID
export const updateOrder = async (req, res) => {
  try {
    // Gérer les erreurs de validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { status, details } = req.body;

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }

    await order.update({ status });

    if (details && details.length > 0) {
      await OrderDetail.destroy({ where: { ID_commande: id } }); // Supprimer les anciens détails
      const orderDetails = details.map((detail) => ({
        ...detail,
        ID_commande: id, // Lier aux détails de la commande mise à jour
      }));
      await OrderDetail.bulkCreate(orderDetails);
    }

    res.status(200).json({ message: "Commande mise à jour avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de la commande", error: error.message });
  }
};

// Supprimer une commande par ID
export const deleteOrder = async (req, res) => {
  try {
    // Gérer les erreurs de validation pour l'ID de la commande
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }

    await OrderDetail.destroy({ where: { ID_commande: id } }); // Supprimer les détails associés
    await order.destroy(); // Supprimer la commande

    res.status(200).json({ message: "Commande supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de la commande", error: error.message });
  }
};
