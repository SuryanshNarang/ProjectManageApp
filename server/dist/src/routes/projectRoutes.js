"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const projectController_1 = require("../controllers/projectController");
const router = (0, express_1.Router)();
router.get("/", projectController_1.getProjects); //for our homepage we are requesting the getProjects.
//app.use("/projects", projectRoutes); defined in root file index.ts
// if above route is something like: /ds (then our route will be /projects/ds)
router.post("/", projectController_1.createProject);
router.delete("/:id", projectController_1.deleteProject);
exports.default = router;
