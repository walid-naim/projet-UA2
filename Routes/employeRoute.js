// Import the Router function for creating routes
import { Router } from "express";

// Import employee controllers
import { 
  getAllEmployees, 
  getEmployeeById, 
  createEmployee, 
  updateEmployee, 
  deleteEmployee 
} from "../controllers/employeController.js";

// Create an instance of Router
const emoloyeroute = Router();

// Define employee routes
emoloyeroute.get('/', getAllEmployees)             // Get all employees with pagination
     .get('/:id', getEmployeeById)          // Get a specific employee by ID
     .post('/', createEmployee)             // Create a new employee
     .put('/:id', updateEmployee)           // Update an employee by ID
     .delete('/:id', deleteEmployee);       // Delete an employee by ID

export default emoloyeroute;