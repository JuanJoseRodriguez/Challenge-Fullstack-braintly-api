import express, { type Express } from "express";
import mongoose from "mongoose";
import cors from "cors";

import { taskRouter } from "./api/routers/taskRouter";
import { env } from "./common/envConfig";

const app: Express = express();

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));

//connection to db
mongoose.connect(env.DB_CONNECT);

// Routes
app.use("/tasks", taskRouter);

export { app };
