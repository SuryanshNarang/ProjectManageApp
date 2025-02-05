import { Router } from "express";
import {
  createTask,
  getTasks,
  getUserTasks,
  updateTaskStatus,
} from "../controllers/taskController";
const router = Router();
router.get("/", getTasks);
router.post("/", createTask);
router.get("/user/:userId", getUserTasks); //Used for Priority
router.patch("/:taskId/status", updateTaskStatus); ///123/status
export default router;
