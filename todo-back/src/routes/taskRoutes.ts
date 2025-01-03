import { Router } from "express";
import {
	createTaskController,
	getAllTasksController,
	getTaskByIdController,
	updateTaskController,
	deleteTaskController,
} from "../controllers/taskController";

const router = Router();

router.post("/todos", createTaskController);
router.get("/todos", getAllTasksController);
router.get("/todos/:id", getTaskByIdController);
router.put("/todos/:id", updateTaskController);
router.delete("/todos/:id", deleteTaskController);

export default router;
