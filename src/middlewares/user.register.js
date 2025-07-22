import { errorResponse } from "../utils/response.js";

export const validateUserRegistration = (req, res, next) => {
    const { email, senha_hash, nome } = req.body;

    if (!email || !senha_hash || !nome) {
        return errorResponse(res, "Todos os campos devem ser preenchidos", 400);
    }

    if (typeof email !== "string" || typeof senha_hash !== "string" || typeof nome !== "string") {
        return errorResponse(res, "Tipo inválido", 400);
    }

    if (!email.includes("@") || !email.includes(".com")) {
      return errorResponse(res, "E-mail inválido", 400);
    }

    if (senha_hash.length < 8) {
      return errorResponse(res, "Senha deve ter pelo menos 8 caracteres", 400);
    }

    next();
}