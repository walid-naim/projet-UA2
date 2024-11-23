import { Router } from "express";
import { login } from "../authentification/login.js";
import loginRules from "../validations/loginValidation.js";



const authRoute = Router()

authRoute.post('/', loginRules, login)

export default authRoute