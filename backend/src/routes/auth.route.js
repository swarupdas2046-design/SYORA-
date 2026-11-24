import express from 'express'
import { loginController, registerController } from '../controllers/auth.controller.js';

const authRouter = express.Router()

/**
 * @swagger
 * /api/auth/register:
 *   post:
 * 
 */

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);

export default authRouter