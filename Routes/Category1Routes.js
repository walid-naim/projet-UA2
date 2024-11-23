// Importer la fonction Router pour la création des routes
import { Router } from 'express';

// Importer les controllers de Category
import { 
    getAllCategories, 

    createCategory, 
    updateCategory, 
    deleteCategory 
} from "../controllers/Category1Controller.js";

// Création d'une instance de Router
const Categoryroute = Router();

Categoryroute.get('/', getAllCategories)
    
    .post('/', createCategory)
    .put('/:id', updateCategory)
    .delete('/:id', deleteCategory);

export default Categoryroute;
