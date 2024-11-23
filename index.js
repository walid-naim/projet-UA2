import express from "express";
import cors from 'cors';
import helmet from "helmet";
import compression from "compression";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import  http from 'http';
import database from './config/connection.js';



import Categoryroute from "./Routes/Category1Routes.js";
import Clientroute from "./Routes/ClientRoute.js";
import productroute from "./Routes/ProductRoutes.js";
import methoderoute from "./Routes/MethodpaymentRoute.js";
import transactionroute from "./Routes/transactionRoute.js";
import commendroute from "./Routes/commandeRoute.js";
import emoloyeroute from "./Routes/employeRoute.js";
import authRoute from "./Routes/authRoute.js";

database.sync({ force: true })  
    .then(() => console.log("Database synced successfully"))
    .catch(error => console.error("Error syncing database:", error));
// Charger les variables d'environnement


const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Définir les routes pour les différentes entités
app.use('/api/categories', Categoryroute);
app.use('/api/clients', Clientroute);
app.use('/api/product', productroute);
app.use('/api/paymentmethods', methoderoute);
app.use('/api/paymenttransactions', transactionroute);
app.use('/api/commands', commendroute);
app.use('/api/employees', emoloyeroute);

app.use('/api/login', authRoute)
// Récupérer le port à partir des variables d’environnement
const PORT = dotenv.config().parsed.PORT;


//Creer le serveur
/*const server= http.createServer((req,res)=>{
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.write('Bienvenu cher utilisateur')
    res.end()
    })*/
app.listen(PORT, () => console.log(`Le serveur tourne sur le port ${PORT}`))

