import express from 'express'
import { getMeController, loginController, logoutController, registerController } from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const authRouter = express.Router()

/**
 * @swagger
 * /api/auth/register:
 *   post:
 * 
 */

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.get("/get-me",authMiddleware,getMeController);
authRouter.get("/logout",logoutController);

export default authRouter