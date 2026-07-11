import { Router } from "express";
import { createProjectController, getAllProjectsInWorkspaceController, getProjectByIdAndWorkspaceController } from "../controllers/project.controller";


const projectRoutes = Router();

projectRoutes.post("/workspace/:workspaceId/create", createProjectController);

projectRoutes.get("/workspace/:workspaceId/all", getAllProjectsInWorkspaceController);

projectRoutes.get("/:id/workspace/:workspaceId/analytics");

projectRoutes.get("/:id/workspace/:workspaceId", getProjectByIdAndWorkspaceController);


export default projectRoutes;