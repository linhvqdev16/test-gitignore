import { UserModel } from "./user-model";

export interface AuthenModel{
    token?: string, 
    token_type?: string, 
    expires_in?: number, 
    userInfo?: UserModel
}