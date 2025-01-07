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
exports.createProject = exports.getProjects = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient(); // Initialize Prisma Client
// Fetch all projects
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield prisma.project.findMany(); // Retrieve all projects from the database
        res.json(projects); // Send the projects as JSON response
    }
    catch (error) {
        console.error("Error retrieving projects:", error);
        res
            .status(500)
            .json({ message: `Error retrieving projects  ${error.message}` }); // Send error response
    }
});
exports.getProjects = getProjects;
// Create a new project
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectName, description, startDate, endDate } = req.body;
    // Validate required fields
    if (!projectName || !startDate) {
        res
            .status(400)
            .json({ message: "Project name and start date are required" });
        return;
    }
    try {
        const newProject = yield prisma.project.create({
            data: {
                projectName, // Match the field name in the Prisma schema
                description,
                startDate: startDate ? new Date(startDate) : null, // Parse to Date
                endDate: endDate ? new Date(endDate) : null, // Handle null values
            },
        });
        res.status(201).json(newProject);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Error creating project: ${error.message}` });
    }
});
exports.createProject = createProject;
