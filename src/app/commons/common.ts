import { environment } from "../../environments/environment.development";

declare var $:any; 

export class Common{

    private static LocalStorageAuthenKey = environment.authTokenKey;

    public static GetUrl(absolutePath: string): string{
        return `${environment.apiUrl}${absolutePath}`;
    }
    public static GetAuthenToken(): string {
        // return localStorage.getItem(this.LocalStorageAuthenKey) || '';
        return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjE1ODIwODg4NjIiLCJ1c2VybmFtZSI6ImNvbmdtaW5oMTIzeCIsImFjY2Vzc190b2tlbiI6ImsxNTgyMDg4ODYyLjE3MjQ4MzUyNjQuUXdCMUFFNEFaQUFyQUVFQWRnQm9BRklBU2dCdEFHb0FSQUJJQUhZQU5nQjJBRzBBU2dCM0FFZ0FVUUE5QUQwQSIsIm5iZiI6MTcyNDc1MTg4MiwiZXhwIjoxNzI0NzU1NDgyLCJpYXQiOjE3MjQ3NTE4ODJ9.JAKHiD2jyEjO500YZgrwVUdXr_mvxM2oEfXQtTgrcK8";
    }
}