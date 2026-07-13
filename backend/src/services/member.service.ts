import { ErrorCodeEnum } from "../enums/error-code.enum";
import { Roles } from "../enums/role.enum";
import MemberModel from "../models/member.model";
import RoleModel from "../models/roles-permission.model";
import WorkspaceModel from "../models/workspace.model";
import { BadRequestException, NotFoundException, UnauthorizedException } from "../utils/appError";


export const getMemberRoleWorkspace = async (userId: string, workspaceId: string) => {
    const workspace = await WorkspaceModel.findById(workspaceId);

    if(!workspace){
        throw new NotFoundException("Workspace not found");
    }

    const member = await MemberModel.findOne({
        userId,
        workspaceId,
    }).populate("role");

    if(!member){
        throw new UnauthorizedException(
            "You are not a member of this workspace",
            ErrorCodeEnum.ACCESS_UNAUTHORIZED
        );
    }

    const roleName = member.role?.name;

    return {
        role : roleName,
    }

}

export const joinWorkspaceByInviteService = async (userId: string, inviteCode: string) => {
    const workspace = await WorkspaceModel.findOne({ inviteCode });

    if(!workspace){
        throw new NotFoundException("Invalid invite code or workspace not found");
    }

    const existingMember = await MemberModel.findOne({
        userId,
        workspaceId : workspace._id,
    });

    if(existingMember){
        throw new BadRequestException(
            "You are already a member of this workspace",
            ErrorCodeEnum.ACCESS_UNAUTHORIZED
        );
    }

    const role = await RoleModel.findOne({ name: Roles.MEMBER });

    if(!role){
        throw new NotFoundException("Role not found");
    }

    const member = new MemberModel({
        userId,
        workspaceId : workspace._id,
        role : role._id,
    }); 

    await member.save();

    return {
        workspaceId : workspace._id,
        role : role.name,
    }

}