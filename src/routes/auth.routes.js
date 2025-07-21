import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { validateUserRegistration } from "../middlewares/user.register.js";

export const authRoutes = () => {
    const router = Router();

    router.post("/register", [validateUserRegistration], userController);

    return router;
}