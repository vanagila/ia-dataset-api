import { prisma } from "../database/prisma.connection.js";

export const registerUser = async ({nome, email, senha_hash}) => {
    const existingEmail = await prisma.usuario.findUnique({
        where: { email }
    });

    if (existingEmail) {
        return { error: "E-mail já cadastrado", status: 400 };
    }

    const newUser = await prisma.usuario.create({
        data: {
            nome,
            email,
            senha_hash
        }
    });

    return { message: "Usuário cadastrado com sucesso", user: newUser, status: 201 };
}