import type { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";

//models
const Task = require("../models/Task");

class TaskController {
  public getTasks: RequestHandler = async (req: Request, res: Response) => {
    const filterBy = req.query.filter_by;
    const orderBy = req.query.order_by || "-deadline";

    const serviceResponse = await Task.find(filterBy).sort(orderBy);
    res.status(StatusCodes.OK).jsonp(serviceResponse);
  };

  public createTask: RequestHandler = async (req: Request, res: Response) => {
    const todoTask = new Task({
      title: req.body.title,
      content: req.body.content,
      deadline: req.body.deadline || undefined,
    });

    try {
      await todoTask.save();
      res.status(StatusCodes.OK).jsonp(todoTask);
    } catch (err) {
      console.log(err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .jsonp({ message: "Error creating a task" });
    }
  };
  public getTask: RequestHandler = async (req: Request, res: Response) => {
    const id = req.params.id;
    const task = await Task.findById(id);
    if (task) res.status(StatusCodes.OK).jsonp(task);
    else res.status(StatusCodes.OK).jsonp("Task not found");
  };

  public deleteTask: RequestHandler = async (req: Request, res: Response) => {
    const id = req.params.id;
    const serviceResponse = await Task.findByIdAndDelete(id);
    res.status(StatusCodes.OK).jsonp(serviceResponse);
  };

  public updateTask: RequestHandler = async (req: Request, res: Response) => {
    const id = req.params.id;
    const content = {
      title: req.body.title || undefined,
      content: req.body.content || undefined,
      done: req.body.done,
      deadline: req.body.deadline || null,
    };
    const serviceResponse = await Task.findByIdAndUpdate(id, content);
    res.status(StatusCodes.OK).jsonp(serviceResponse);
  };
}

export const taskController = new TaskController();
