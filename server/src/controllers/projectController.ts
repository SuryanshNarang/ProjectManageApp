// Import necessary modules and initialize Prisma Client
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); // Initialize Prisma Client

// Fetch all projects
export const getProjects = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const projects = await prisma.project.findMany(); // Retrieve all projects from the database
    res.json(projects); // Send the projects as JSON response
  } catch (error:any) {
    console.error("Error retrieving projects:", error);
    res.status(500).json({ message: `Error retrieving projects  ${error.message}` }); // Send error response
  }
};

// Create a new project
export const createProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { projectName, description, startDate, endDate } = req.body;

  // Validate required fields
  if (!projectName || !startDate) {
    res
      .status(400)
      .json({ message: "Project name and start date are required" });
    return;
  }

  try {
    const newProject = await prisma.project.create({
      data: {
        projectName, // Match the field name in the Prisma schema
        description,
        startDate: startDate ? new Date(startDate) : null, // Parse to Date
        endDate: endDate ? new Date(endDate) : null, // Handle null values
      },
    });

    res.status(201).json(newProject);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error creating project: ${error.message}` });
  }
};
