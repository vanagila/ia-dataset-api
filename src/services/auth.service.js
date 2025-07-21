import { prisma } from "../database/prisma.connection.js";
import { createBcryptAdapter } from "../adapters/bcrypt.adapter.js";
import { createJwtAdapter } from "../adapters/jwt.adapter.js";
import { envs } from "../envs/index.js";

const bcryptService = createBcryptAdapter(Number(envs.BCRYPT_SALT));
const jwtService = createJwtAdapter(envs.JWT_SECRET_KEY, envs.JWT_EXPIRE_IN);

export const registerUser = async ({nome, email, senha_hash}) => {
    const existingEmail = await prisma.usuario.findUnique({
        where: { email }
    });

    if (existingEmail) {
        return { error: "E-mail já cadastrado", status: 400 };
    }

    const hashedPassword = await bcryptService.generateHash(senha_hash);

    const newUser = await prisma.usuario.create({
        data: {
            nome,
            email,
            senha_hash: hashedPassword
        }
    });

    return { message: "Usuário cadastrado com sucesso", user: newUser, status: 201 };
}

export const authService = () => {

    const login = async ({email, senha_hash}) => {
        const userFound = await prisma.usuario.findUnique({
            where: { email }
        });
    
        if (!userFound) {
            return { error: "Dados inválidos", status: 401 };
        }
    
        const passwordMatches = await bcryptService.matchesHash(
            senha_hash,
            userFound.senha_hash
        );
    
        if (!passwordMatches) {
            return { error: "Dados inválidos", status: 401 };
        }
    
        const payloadToken = {
            id: userFound.id,
            email: userFound.email,
            nome: userFound.nome
        };
    
        const token = jwtService.generateToken(payloadToken);

        await prisma.usuario.update({
            where: { id: userFound.id },
            data: { auth_token: token }
        });
    
        return {
            message: "Login feito com sucesso",
            data: {
                token,
                user: {
                    id: userFound.id,
                    nome: userFound.nome,
                    email: userFound.email
                }
            },
            status: 200
        };
    };

    const logout = async (userId) => {
        const user = await prisma.usuario.findUnique({
            where: { id: userId }
        });

        if (!user || !user.auth_token) {
            return { error: "Usuário não autenticado", status: 401 };
        }

        await prisma.usuario.update({
            where: { id: userId },
            data: { auth_token: null }
        });

        return {
            status: 200,
            message: "Logout feito com sucesso"
        };
    };

    return {
        login,
        logout
    };
    
}