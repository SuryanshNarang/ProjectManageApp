"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = require("../controllers/taskController");
const router = (0, express_1.Router)();
router.get("/", taskController_1.getTasks);
router.post("/", taskController_1.createTask);
router.get("/user/:userId", taskController_1.getUserTasks); //Used for Priority
router.patch("/:taskId/status", taskController_1.updateTaskStatus); ///123/status
exports.default = router;
