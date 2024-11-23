// Importer la fonction Router pour la création des routes
import { Router } from "express";

// Importer les controllers de Product
import { 
    getAllProducts, 
    getProductById, 
    createProduct, 
    updateProduct, 
    deleteProduct 
} from "../controllers/productController.js";

// Création d'une instance de Router
const productroute = Router();

productroute.get('/', getAllProducts)       // Obtenir tous les produits
    .get('/:id', getProductById)      // Obtenir un produit par son ID
    .post('/', createProduct)         // Créer un nouveau produit
    .put('/:id', updateProduct)       // Mettre à jour un produit par son ID
    .delete('/:id', deleteProduct);   // Supprimer un produit par son ID

export default productroute;
