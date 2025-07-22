import { registerUser, authService } from "../services/auth.service.js";
import { errorResponse, successResponse } from "../utils/response.js";

export const registerController = async (req, res) => {
    const { nome, email, senha_hash } = req.body;

    const result = await registerUser({ nome, email, senha_hash });

    if (result.error) {
        return errorResponse(res, result.error, result.status);
    }

    return successResponse(res, result.user, result.message, result.status);
}

export const loginController = async (req, res) => {
    const { email, senha_hash } = req.body;

    const result = await authService().login({ email, senha_hash});

    if (result.error) {
        return errorResponse(res, result.error, result.message, result.status)
    }

    return successResponse(res, result.data.token, result.message, result.status);
}

export const logoutController = async (req, res) => {
    const user = req.authorizedUser;

    if (!user || !user.id) {
        return errorResponse(res, "Usuário não autenticado", 400);
    }

    const result = await authService().logout(user.id);

    if (result.error) {
        return errorResponse(res, result.error, result.status);
    }

    return successResponse(res, null, result.message, result.status);
};


export const meController = async (req, res) => {
    const user = req.authorizedUser;

    if (!user) {
        return errorResponse(res, "Usuário não autenticado", 401);
    }

    return successResponse(res, {
        id: user.id,
        nome: user.nome,
        email: user.email
    }, "Usuário autenticado com sucesso");
};
