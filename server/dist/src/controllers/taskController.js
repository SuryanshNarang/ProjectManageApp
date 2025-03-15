"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserTasks = exports.updateTaskStatus = exports.createTask = exports.getTasks = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient(); // Initialize Prisma Client
// We need to grab our tasks based on the projects. (so our project contains a list of tasks)
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId } = req.query;
    const projectIdInt = Number(projectId);
    if (isNaN(projectIdInt)) {
        return res.status(400).json({ message: "Invalid projectId" });
    }
    //instead of body this time its going to be query because this is the get Request.(getTasks as our projectId will be in queryparams)
    try {
        const tasks = yield prisma.task.findMany({
            where: {
                projectId: Number(projectId),
            },
            include: {
                author: true,
                assignee: true,
                comments: true,
                attachments: {
                    include: { uploadedBy: true },
                },
            },
        });
        //its going to be the query param where our projectID will be at.(this will grab the tasks from the specific project id)
        res.json(tasks);
    }
    catch (error) {
        console.error("Error retrieving tasks:", error);
        res
            .status(500)
            .json({ message: `Error retrieving tasks  ${error.message}` }); // Send error response
    }
});
exports.getTasks = getTasks;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, status, priority, tags, startDate, dueDate, points, projectId, authorUserId, assignedUserId, } = req.body;
    // Validate required fields
    try {
        const newTask = yield prisma.task.create({
            data: {
                title,
                description,
                status,
                priority,
                tags,
                startDate,
                dueDate,
                points,
                projectId,
                authorUserId,
                assignedUserId,
            },
        });
        res.status(201).json(newTask);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Error creating project: ${error.message}` });
    }
});
exports.createTask = createTask;
const updateTaskStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskId } = req.params;
    const { status } = req.body;
    try {
        const updatedTask = yield prisma.task.update({
            where: {
                id: Number(taskId),
            },
            data: {
                status: status,
            },
        });
        res.json(updatedTask);
    }
    catch (error) {
        console.error("Error retrieving tasks:", error);
        res.status(500).json({ message: `Error updating tasks  ${error.message}` }); // Send error response
    }
});
exports.updateTaskStatus = updateTaskStatus;
// FOR PRIORITY PAGES..We want the priorities for specific Users.
const getUserTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    //instead of body this time its going to be query because this is the get Request.(getTasks as our projectId will be in queryparams)
    try {
        const tasks = yield prisma.task.findMany({
            where: {
                OR: [
                    { authorUserId: Number(userId) },
                    { assignedUserId: Number(userId) },
                ],
            },
            include: {
                author: true,
                assignee: true,
            },
        });
        //its going to be the query param where our projectID will be at.(this will grab the tasks from the specific project id)
        res.json(tasks);
    }
    catch (error) {
        console.error("Error retrieving tasks:", error);
        res
            .status(500)
            .json({ message: `Error retrieving tasks  ${error.message}` }); // Send error response
    }
});
exports.getUserTasks = getUserTasks;
