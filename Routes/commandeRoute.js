//// Import the Router function for creating routes
import { Router } from "express";

// Import order controllers
import { 
    createOrder, 
    getAllOrders, 
    getOrderById, 
    updateOrder, 
    deleteOrder 
} from "../controllers/commandeController.js";

// Create an instance of Router
const commendroute = Router();

// Define order routes
commendroute.post('/', createOrder)              // Create a new order
     .get('/', getAllOrders)              // Get all orders with pagination
     .get('/:id', getOrderById)           // Get a specific order by ID
     .put('/:id', updateOrder)            // Update an order by ID
     .delete('/:id', deleteOrder);        // Delete an order by ID

export default commendroute;