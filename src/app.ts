import express from "express";
import cors from "cors";

// Type declarations are picked up automatically by TypeScript, no need to import
import { errorHandler } from "./common/middlewares/error.middleware";
import router from "./routes";
import { httpLogger } from "./common/middlewares/logger.middleware";

const app = express();

app.use(cors());
app.use(express.json());
// app.use(httpLogger);

app.use("/api/v1", router);
app.use(errorHandler);

export default app;
