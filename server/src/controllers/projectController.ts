// Most of our logic for API's
import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
// this is so that we can use prisma and grab data from our database.
export const getProjects = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const projects = await prisma.project.findMany(); //inside prisma we are grabbing our projectSchema when we did the npx prisma generate thats why we can grab from prisma directly instead
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving projects" });
  }
};
