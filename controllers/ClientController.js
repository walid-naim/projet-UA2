import { Client } from "../Models/relation.js";
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';

// Créer un client
export const createClient = async (req, res) => {
  try {
    // Gérer les erreurs de validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, phone, address, password } = req.body;

    // Vérifier si le mot de passe est fourni
    if (!password) {
      return res.status(400).json({ error: "Le mot de passe est requis." });
    }

    // Hash du mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const client = await Client.create({ 
      firstName, 
      lastName, 
      email, 
      phone, 
      address, 
      password: hashedPassword 
    });
    res.status(201).json(client);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtenir tous les clients
export const getAllClients = async (req, res) => {
  try {
    const clients = await Client.findAll({ attributes: { exclude: ['password'] } });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour un client
export const updateClient = async (req, res) => {
  try {
    // Gérer les erreurs de validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, phone, address, password } = req.body;
    const client = await Client.findByPk(req.params.id);

    if (client) {
      client.firstName = firstName || client.firstName;
      client.lastName = lastName || client.lastName;
      client.email = email || client.email;
      client.phone = phone || client.phone;
      client.address = address || client.address;

      // Mise à jour du mot de passe si fourni
      if (password) {
        const salt = await bcrypt.genSalt(10);
        client.password = await bcrypt.hash(password, salt);
      }

      await client.save();
      res.json(client);
    } else {
      res.status(404).json({ error: "Client non trouvé" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer un client
export const deleteClient = async (req, res) => {
  try {
    // Gérer les erreurs de validation pour l'ID du client
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const client = await Client.findByPk(req.params.id);

    if (client) {
      await client.destroy();
      res.status(200).json({ message: 'Client supprimé' });
    } else {
      res.status(404).json({ error: "Client non trouvé" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
