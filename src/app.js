import express from "express";
import { estadoRouter } from "./routes/estadoRoutes.js";
import { errorHandler, notFound } from "./middlewares/errorHandler.js";

export const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", service: "estados-api" });
});

app.use("/api/estados", estadoRouter);

app.use(notFound);
app.use(errorHandler);