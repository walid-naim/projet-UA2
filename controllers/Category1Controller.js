import { validationResult } from 'express-validator';
import { Category } from "../Models/relation.js";

// Créer une catégorie
export const createCategory = async (req, res) => {
  try {
    // Gérer les erreurs de validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Le nom est requis" });
    }

    // Créer la catégorie avec le nom fourni
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtenir toutes les catégories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour une catégorie
export const updateCategory = async (req, res) => {
  try {
    // Gérer les erreurs de validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;
    const category = await Category.findByPk(req.params.id);

    if (category) {
      if (!name) {
        return res.status(400).json({ error: "Le nom est requis" });
      }

      // Mettre à jour le nom de la catégorie si elle est trouvée
      category.name = name;
      await category.save();
      res.json(category);
    } else {
      res.status(404).json({ error: "Catégorie non trouvée" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer une catégorie
export const deleteCategory = async (req, res) => {
  try {
    // Gérer les erreurs de validation pour l'ID de la catégorie
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const category = await Category.findByPk(req.params.id);

    if (category) {
      await category.destroy();
      res.status(200).json({ message: 'Catégorie supprimée' });
    } else {
      res.status(404).json({ error: "Catégorie non trouvée" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
