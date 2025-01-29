import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); // Initialize Prisma Client

// We need to grab our tasks based on the projects. (so our project contains a list of tasks)
export const getTasks = async (req: Request, res: Response): Promise<any> => {
  const { projectId } = req.query;
  const projectIdInt = Number(projectId);

  if (isNaN(projectIdInt)) {
    return res.status(400).json({ message: "Invalid projectId" });
  }
  //instead of body this time its going to be query because this is the get Request.(getTasks as our projectId will be in queryparams)
  try {
    const tasks = await prisma.task.findMany({
      where: {
        projectId: Number(projectId), // Ensure it's a number
      },
      include: {
        author: true,
        assignee: true,
        comments: true,
        Attachment: true,
      },
    });
    //its going to be the query param where our projectID will be at.(this will grab the tasks from the specific project id)

    res.json(tasks);
  } catch (error: any) {
    console.error("Error retrieving tasks:", error);
    res
      .status(500)
      .json({ message: `Error retrieving tasks  ${error.message}` }); // Send error response
  }
};
