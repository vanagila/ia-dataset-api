import { uploadDataset, getUserDatasets } from "../services/dataset.service.js";
import { successResponse, errorResponse } from "../utils/response.js";

export const datasetUploadController = async (req, res) => {
    try {
        const user = req.authorizedUser;
        const file = req.file;

        if (!file) {
        return errorResponse(res, "Arquivo não enviado", 400);
        }

        const datasetId = await uploadDataset(user.id, file);

        return successResponse(res, { datasetId }, "Upload realizado com sucesso", 201);
    } catch (err) {
        return errorResponse(res, "Erro ao fazer upload", 500, err.message);
    }
};

export const listUserDatasetsController = async (req, res) => {
    try {
        const user = req.authorizedUser;

        const datasets = await getUserDatasets(user.id);

        return successResponse(res, datasets, "Datasets listados com sucesso");
    } catch (err) {
        return errorResponse(res, "Erro ao listar datasets", 500, err.message);
    }
};
