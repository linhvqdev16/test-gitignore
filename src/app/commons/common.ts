import { environment } from "../../environments/environment.development";

declare var $:any; 

export class Common{

    private static LocalStorageAuthenKey = environment.authTokenKey;

    public static GetUrl(absolutePath: string): string{
        return `${environment.apiUrl}${absolutePath}`;
    }
    public static GetAuthenToken(): string {
        // return localStorage.getItem(this.LocalStorageAuthenKey) || '';
        return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjE1ODIwODg4NjIiLCJ1c2VybmFtZSI6ImNvbmdtaW5oMTIzeCIsImFjY2Vzc190b2tlbiI6ImsxNTgyMDg4ODYyLjE3MjQ4NTg4NjcuUlFCSUFFd0FiZ0JvQUdFQVV3QmlBRmdBZHdCVkFIa0FOUUJRQURRQVNRQmxBRm9BVndCS0FIZ0FVUUE5QUQwQSIsIm5iZiI6MTcyNDc3MjQ3NCwiZXhwIjoxNzI0Nzc2MDc0LCJpYXQiOjE3MjQ3NzI0NzR9._ZWGAiCD7Ziop5Ze8WkHu8kwn7qKf_4X9dxcdBZXzBE";
    }
}