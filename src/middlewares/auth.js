import { createJwtAdapter } from "../adapters/jwt.adapter.js";
import { envs } from "../envs/index.js";
import { prisma } from "../database/prisma.connection.js";
import { errorResponse } from "../utils/response.js";

export const authenticate = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return errorResponse(res, "Token obrigatório", 401);
    }

    try {
        const decoded = token.split(" ")[1];
        const jwt = createJwtAdapter(envs.JWT_SECRET_KEY, envs.JWT_EXPIRE_IN);
        const userAuth = jwt.decodeToken(decoded);

        if (!userAuth) {
            return errorResponse(res, "Token inválido", 400);
        }

        req.authorizedUser = userAuth;
        return next();
    } catch (err) {
        if (err && typeof err.name === 'string' && err.name.startsWith('JsonWebToken')) {
            return errorResponse(res, "Token inválido ou expirado", 401);
        }

        return errorResponse(res, "Problema no servidor", 500);
    }
};
