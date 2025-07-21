import express from "express";
import cors from "cors";
import { envs } from "./envs/index.js";
import { authRoutes } from "./routes/auth.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.use("/auth", authRoutes());

app.listen(envs.PORT, () => {
    console.log(`Servidor rodando na porta ${envs.PORT}`)
})

app.get("/", (_, res) => res.status(200).json({ ok: true }))