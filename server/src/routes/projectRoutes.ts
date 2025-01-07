import { Router } from "express";
import { createProject, getProjects } from "../controllers/projectController";

const router = Router();
router.get("/", getProjects); //for our homepage we are requesting the getProjects.
//app.use("/projects", projectRoutes); defined in root file index.ts
// if above route is something like: /ds (then our route will be /projects/ds)
router.post("/createProjects",createProject)
export default router;
