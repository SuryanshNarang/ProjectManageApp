import { Router } from "express";
import { getProjects } from "../controllers/projectController";
const router = Router();
router.get("/", getProjects); //for our homepage we are requesting the getProjects.
export default router;
