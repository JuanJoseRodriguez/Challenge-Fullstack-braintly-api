import express, { Router, type Express } from "express";

import { taskController } from "../controllers/taskController";

const app: Express = express();
export const taskRouter: Router = express.Router();

taskRouter.get("/", taskController.getTasks);
taskRouter.post("/", taskController.createTask);
taskRouter.get("/:id", taskController.getTask);
taskRouter.delete("/:id", taskController.deleteTask);
taskRouter.patch("/:id", taskController.updateTask);
