// Importer la fonction Router pour la création des routes
import { Router } from "express";

// Importer les controllers de PaymentMethod
import { 
    getAllPaymentMethods, 
    getPaymentMethodById, 
    createPaymentMethod, 
    updatePaymentMethod, 
    deletePaymentMethod 
} from "../controllers/methodepaimentController.js";

// Création d'une instance de Router
const methoderoute = Router();

methoderoute.get('/', getAllPaymentMethods)
    .get('/:id', getPaymentMethodById)
    .post('/', createPaymentMethod)
    .put('/:id', updatePaymentMethod)
    .delete('/:id', deletePaymentMethod);

export default methoderoute;
