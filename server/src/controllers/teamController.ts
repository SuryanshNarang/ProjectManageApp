import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); // Initialize Prisma Client

// Endpoint to retrieve all users
export const getTeams = async (req: Request, res: Response): Promise<void> => {
  try {
    const teams = await prisma.team.findMany(); // Fetch all users from the database
    const teamsWithUsernames = await Promise.all(
      //For each team, it performs an asynchronous operation to fetch data from the database.
      teams.map(async (team: any) => {
        const productOwner = team.productOwnerUserId
        ? await prisma.user.findUnique({
            where: { userId: team.productOwnerUserId },
            select: { username: true },
          })
        : null;
      
      const projectManager = team.projectManagerUserId
        ? await prisma.user.findUnique({
            where: { userId: team.projectManagerUserId },
            select: { username: true },
          })
        : null;
      

        return {
          ...team,
          productOwnerUsername: productOwner?.username,
          projectManagerUsername: projectManager?.username, //adding the usernames to the team object
        };
      })
    );

    res.json(teamsWithUsernames); // Send users as JSON response
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    res
      .status(500)
      .json({ message: `Error retrieving teams: ${errorMessage}` });
  }
};
