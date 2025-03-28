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
exports.search = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient(); // Initialize Prisma Client
// We need to grab our tasks based on the projects. (so our project contains a list of tasks)
const search = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req.query;
    try {
        const task = yield prisma.task.findMany({
            where: {
                OR: [
                    { title: { contains: query } },
                    { description: { contains: query } },
                ],
            },
        });
        const project = yield prisma.project.findMany({
            where: {
                OR: [
                    { projectName: { contains: query } },
                    { description: { contains: query } },
                ],
            },
        });
        const users = yield prisma.user.findMany({
            where: {
                OR: [{ username: { contains: query } }],
            },
        });
        res.json({ task, project, users }); // Return the results to frontend
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Error performing search  ${error.message}` }); // Send error response
    }
});
exports.search = search;
// after this we are going to routes.
