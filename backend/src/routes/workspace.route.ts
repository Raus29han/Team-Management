
import { Router } from 'express';
import { changeWorkspaceMemberRoleController, createWorkSpaceController, deleteWorkspaceByIdController, getAllWorkspaceUserIsMemberController, getWorkspaceAnalyticsController, getWorkspaceByIdController, getWorkspaceMembersController, updateWorkspaceByIdController } from '../controllers/workspace.controller';

const workspaceRoutes = Router();

workspaceRoutes.post("/create/new", createWorkSpaceController);

workspaceRoutes.put("/update/:id", updateWorkspaceByIdController);

workspaceRoutes.put("/change/member/role/:id", changeWorkspaceMemberRoleController); 

workspaceRoutes.delete("/delete/:id", deleteWorkspaceByIdController)

workspaceRoutes.get("/all", getAllWorkspaceUserIsMemberController);

workspaceRoutes.get("/members/:id", getWorkspaceMembersController);

workspaceRoutes.get("/analytics/:id", getWorkspaceAnalyticsController);

workspaceRoutes.get("/:id", getWorkspaceByIdController);

export default workspaceRoutes;