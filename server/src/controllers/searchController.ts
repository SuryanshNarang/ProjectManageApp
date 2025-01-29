import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); // Initialize Prisma Client

// We need to grab our tasks based on the projects. (so our project contains a list of tasks)
export const search = async (req: Request, res: Response): Promise<any> => {
  const { query } = req.query;

  try {
    const task = await prisma.task.findMany({
      where: {
        OR: [
          { title: { contains: query as string } },
          { description: { contains: query as string } },
        ],
      },
    });

    const project = await prisma.project.findMany({
      where: {
        OR: [
          { projectName: { contains: query as string } },
          { description: { contains: query as string } },
        ],
      },
    });

    const users = await prisma.user.findMany({
      where: {
        OR: [{ username: { contains: query as string } }],
      },
    });
    res.json({ task, project, users }); // Return the results to frontend
  } catch (error: any) {
    console.error("Error retrieving tasks:", error);
    res
      .status(500)
      .json({ message: `Error retrieving tasks  ${error.message}` }); // Send error response
  }
};
