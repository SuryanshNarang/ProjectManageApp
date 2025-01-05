// Most of our logic for API's
import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client/extension";
const prisma = new PrismaClient();
// this is so that we can use prisma and grab data from our database.
export const getProjects = async(
    req: Request,
    res: Response
)