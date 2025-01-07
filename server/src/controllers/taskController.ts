import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); // Initialize Prisma Client

// We need to grab our tasks based on the projects. (so our project contains a list of tasks)
export const getTasks = async (req: Request, res: Response): Promise<void> => {
  const { projectId } = req.query; //instead of body this time its going to be query because this is the get Request.(getTasks as our projectId will be in queryparams)
  try {
    const tasks = await prisma.task.findMany({
      where: {
        projectId: Number(projectId), // here we are converting the string to number
      },
      include: {
        author: true, // include the related project data
        assignee: true, //
        comments: true, //
        Attachment: true, //
      },
    }); //its going to be the query param where our projectID will be at.(this will grab the tasks from the specific project id)

    res.json(tasks);
  } catch (error: any) {
    console.error("Error retrieving tasks:", error);
    res
      .status(500)
      .json({ message: `Error retrieving tasks  ${error.message}` }); // Send error response
  }
};
