import { RoleModel } from "./role-model";

export interface ServerModel{
    serverId?: number; 
    serverName?: string; 
    roles?: Array<RoleModel>
}