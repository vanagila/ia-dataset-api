import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const swaggerDocument = require("../swagger.json");
import { envs } from "./envs/index.js";
import { authRoutes } from "./routes/auth.routes.js";
import { datasetRoutes } from "./routes/dataset.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.use("/auth", authRoutes());
app.use("/datasets", datasetRoutes());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(envs.PORT, () => {
    console.log(`Servidor rodando na porta ${envs.PORT}`)
})

app.get("/", (_, res) => res.status(200).json({ ok: true }))