import { Product } from "../Models/relation.js";
import { validationResult } from 'express-validator';

// Créer un produit
export const createProduct = async (req, res) => {
  try {
    // Validation des entrées
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, price, stock } = req.body;

    // Vérifier la validité des champs
    if (!name || price == null || stock == null) {
      return res.status(400).json({ error: "Tous les champs (name, price, stock) sont requis." });
    }

    const product = await Product.create({ name, price, stock });
    res.status(201).json(product);
  } catch (error) {
    console.error("Erreur lors de la création du produit:", error);
    res.status(500).json({ error: error.message });
  }
};

// Obtenir tous les produits avec pagination
export const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { rows: products, count: totalProducts } = await Product.findAndCountAll({
      offset,
      limit
    });

    const totalPages = Math.ceil(totalProducts / limit);

    res.status(200).json({
      page,
      limit,
      totalPages,
      totalProducts,
      data: products
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des produits:", error);
    res.status(500).json({ error: error.message });
  }
};

// Obtenir un produit par ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: "Produit non trouvé" });
    }
  } catch (error) {
    console.error("Erreur lors de la récupération du produit:", error);
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour un produit
export const updateProduct = async (req, res) => {
  try {
    const { name, price, stock } = req.body;
    const product = await Product.findByPk(req.params.id);

    if (product) {
      // Vérification des modifications
      if (name !== undefined) product.name = name;
      if (price !== undefined) product.price = price;
      if (stock !== undefined) product.stock = stock;

      await product.save();
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: "Produit non trouvé" });
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour du produit:", error);
    res.status(500).json({ error: error.message });
  }
};

// Supprimer un produit
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      await product.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Produit non trouvé" });
    }
  } catch (error) {
    console.error("Erreur lors de la suppression du produit:", error);
    res.status(500).json({ error: error.message });
  }
};
