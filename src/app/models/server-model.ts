import { RoleModel } from "./role-model";

export interface ServerModel{
    serverId?: string; 
    serverName?: string; 
    roles?: Array<RoleModel>
}