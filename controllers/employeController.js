import { Employee } from "../Models/relation.js";
import { validationResult } from 'express-validator';

// Obtenir tous les employés avec pagination
export const getAllEmployees = async (req, res) => {
  try {
    // Récupérer les paramètres de pagination depuis la requête
    const page = parseInt(req.query.page) || 1;  // Par défaut, page 1
    const limit = parseInt(req.query.limit) || 10;  // Par défaut, 10 éléments par page
    const offset = (page - 1) * limit;  // Calculer l'offset pour Sequelize

    // Récupérer les employés avec pagination
    const employees = await Employee.findAndCountAll({
      limit,  // Nombre d'éléments par page
      offset, // Nombre d'éléments à ignorer
    });

    // Répondre avec les données paginées
    res.status(200).json({
      page,
      limit,
      totalPages: Math.ceil(employees.count / limit),
      totalEmployees: employees.count,
      data: employees.rows,
    });
  } catch (error) {
    // Log l'erreur et renvoie une réponse appropriée
    console.error("Erreur lors de la récupération des employés:", error);
    res.status(500).json({
      message: "Erreur lors de la récupération des employés",
      error: error.message || "Erreur inconnue",
    });
  }
};

// Obtenir un employé par son ID
export const getEmployeeById = async (req, res) => {
  try {
    // Trouver l'employé par ID
    const employee = await Employee.findByPk(req.params.id);  // Utiliser findByPk si on utilise Sequelize
    if (!employee) {
      return res.status(404).json({ message: "Employé non trouvé" });
    }
    res.status(200).json(employee);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'employé:", error);  // Log l'erreur
    res.status(500).json({ message: "Erreur lors de la récupération de l'employé", error: error.message });
  }
};

// Créer un nouvel employé
export const createEmployee = async (req, res) => {
  try {
    // Gérer les erreurs de validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, position, salary } = req.body;

    // Vérifier que les champs requis sont présents
    if (!firstName || !lastName) {
      return res.status(400).json({
        message: "Le prénom et le nom sont requis",
      });
    }

    // Créer un nouvel employé dans la base de données
    const newEmployee = await Employee.create({ firstName, lastName, position, salary });
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la création de l'employé",
      error: error.message,
    });
  }
};

// Mettre à jour un employé par son ID
export const updateEmployee = async (req, res) => {
  try {
    // Gérer les erreurs de validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Trouver l'employé par ID
    const employee = await Employee.findByPk(req.params.id);

    // Si l'employé n'est pas trouvé, renvoyer une erreur 404
    if (!employee) {
      return res.status(404).json({ message: "Employé non trouvé" });
    }

    // Mettre à jour les détails de l'employé avec les nouvelles données
    const updatedEmployee = await employee.update(req.body);

    // Répondre avec les nouvelles données de l'employé
    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'employé:", error);
    res.status(500).json({ message: "Erreur lors de la mise à jour de l'employé", error: error.message });
  }
};

// Supprimer un employé par son ID
export const deleteEmployee = async (req, res) => {
  try {
    // Trouver l'employé par ID
    const employee = await Employee.findByPk(req.params.id);

    // Si l'employé n'existe pas, renvoyer une erreur 404
    if (!employee) {
      return res.status(404).json({ message: "Employé non trouvé" });
    }

    // Supprimer l'employé
    await employee.destroy();

    // Répondre avec un message de succès
    res.status(200).json({ message: "Employé supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'employé:", error);
    res.status(500).json({ message: "Erreur lors de la suppression de l'employé", error: error.message });
  }
};
