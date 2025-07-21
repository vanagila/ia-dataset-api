import { Router } from "express";
import { registerController, loginController, logoutController, meController } from "../controllers/auth.controller.js";
import { validateUserRegistration } from "../middlewares/user.register.js";
import { validateUserLogin } from "../middlewares/user.login.js";
import { authenticate } from "../middlewares/auth.js";

export const authRoutes = () => {
    const router = Router();

    router.post("/register", [validateUserRegistration], registerController);
    router.post("/login", [validateUserLogin], loginController);
    router.post("/logout", [authenticate], logoutController);
    router.get("/me", [authenticate], meController);

    return router;
}