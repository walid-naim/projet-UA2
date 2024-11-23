// Importer la fonction Router pour la création des routes
import { Router } from "express";

// Importer les controllers de PaymentTransaction
import { 
    getAllTransactions, 
    getTransactionById, 
    createTransaction, 
    updateTransaction, 
    deleteTransaction 
} from "../controllers/transactionController.js";

// Création d'une instance de Router
const transactionroute = Router();

transactionroute.get('/', getAllTransactions)
    .get('/:id', getTransactionById)
    .post('/', createTransaction)
    .put('/:id', updateTransaction)
    .delete('/:id', deleteTransaction);

export default transactionroute;
