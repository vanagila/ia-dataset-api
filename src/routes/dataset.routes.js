import { Router } from "express";
import { datasetUploadController, listUserDatasetsController } from "../controllers/dataset.controller.js";
import { authenticate } from "../middlewares/auth.js";
import { upload } from "../middlewares/upload.js";

export const datasetRoutes = () => {
    const router = Router();

    router.post("/upload", [authenticate, upload.single("file")], datasetUploadController);
    router.get("/", [authenticate], listUserDatasetsController);

    return router;
};