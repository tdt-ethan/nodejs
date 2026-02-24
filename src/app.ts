import express from "express";
import cors from "cors";
import todoRoutes from "./modules/todo/todo.route";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/todos", todoRoutes);

app.use(errorHandler);

export default app;
