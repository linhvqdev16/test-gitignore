import {enviroment} from "../../eviroments/eviroment.staging"

declare var $:any; 

export class Common{

    private static LocalStorageAuthenKey = enviroment.authTokenKey;

    public static GetUrl(absolutePath: string): string{
        return `${enviroment.baseUrl}${absolutePath}`;
    }
    public static GetAuthenToken(): string {
        return localStorage.getItem(this.LocalStorageAuthenKey) || '';
    }
}