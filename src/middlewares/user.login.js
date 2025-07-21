import { errorResponse } from "../utils/response.js";

export const validateUserLogin = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return errorResponse(res, "Todos os campos devem ser preenchidos", 400);
    }

    next();
}