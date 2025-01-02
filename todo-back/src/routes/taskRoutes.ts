import { Router } from "express";
import {
	createTaskController,
	getAllTasksController,
	getTaskByIdController,
	updateTaskController,
	deleteTaskController,
} from "../controllers/taskController";

const router = Router();

router.post("/api/todos", createTaskController);
router.get("/api/todos", getAllTasksController);
router.get("/api/todos/:id", getTaskByIdController);
router.put("/api/todos/:id", updateTaskController);
router.delete("/api/todos/:id", deleteTaskController);

export default router;
