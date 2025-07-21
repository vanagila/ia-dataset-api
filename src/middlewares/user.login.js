import { errorResponse } from "../utils/response.js";

export const validateUserLogin = (req, res, next) => {
    const { email, senha_hash } = req.body;

    if (!email || !senha_hash) {
        return errorResponse(res, "Todos os campos devem ser preenchidos", 400);
    }

    next();
}