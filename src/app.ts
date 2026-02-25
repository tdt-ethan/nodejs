import express from "express";
import cors from "cors";

import { errorHandler } from "./common/middlewares/error.middleware";
import router from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", router);

app.use(errorHandler);

export default app;
