import { prisma } from "../database/prisma.connection.js";
import fs from "fs";
import path from "path";

export const uploadDataset = async (userId, file) => {
    const dataset = await prisma.dataset.create({
        data: {
            nome: file.originalname,
            usuario_id: userId,
            criado_em: new Date(),
        },
    });

    const filePath = path.join("uploads", file.filename);
    let fileContent;

    if (file.mimetype === "application/pdf") {
        fileContent = fs.readFileSync(filePath, { encoding: "base64" });
    } else {
        fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });
    }

    await prisma.record.create({
        data: {
            dataset_id: dataset.id,
            dados_json: { content: fileContent },
            criado_em: new Date(),
        },
    });

    return dataset.id;
};

export const getUserDatasets = async (userId) => {
    return prisma.dataset.findMany({
        where: { usuario_id: userId },
        orderBy: { criado_em: "desc" },
        select: {
            id: true,
            nome: true,
            criado_em: true,
        }
    });
};
