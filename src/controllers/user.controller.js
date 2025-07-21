import { registerUser } from "../services/user.service.js";
import { errorResponse, successResponse } from "../utils/response.js";

export const userController = async (req, res) => {
    const { nome, email, senha_hash } = req.body;

    const result = await registerUser({ nome, email, senha_hash });

    if (result.error) {
        return errorResponse(res, result.error, result.status);
    }

    return successResponse(res, result.user, result.message, result.status)
}