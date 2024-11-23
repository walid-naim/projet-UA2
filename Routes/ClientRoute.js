// Importer la fonction Router pour la création des routes
import { Router } from "express";

// Importer les controllers de Client
import { 
    getAllClients, 
   
    createClient, 
    updateClient, 
    deleteClient 
} from "../controllers/ClientController.js";

// Création d'une instance de Router
const Clientroute = Router();

Clientroute.get('/', getAllClients)
    
    .post('/', createClient)
    .put('/:id', updateClient)
    .delete('/:id', deleteClient);

export default Clientroute;
