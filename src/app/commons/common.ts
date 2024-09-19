import { inject } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { LocalStorageKey } from "../core/local-storage/local-storage-key";
import { LocalStorageSerice } from "../core/local-storage/local-storeage-service";

declare var $:any; 

export class Common{

    private static LocalStorageAuthenKey = environment.authTokenKey;


    public static GetUrl(absolutePath: string): string{
        return `${environment.apiUrl}${absolutePath}`;
    }
    public static GetClienId(){
        return `${environment.client_id}`; 
    }
    public static GetClientSecret(){
        return `${environment.client_secret}`; 
    }
    public static GetServiceId(){
        return  `${environment.serviceId}`; 
    }
    public static GetAuthorUrl(){
        return `${environment.author_url}`; 
    }
    public static GetAccessTokenUrl(){
        return `${environment.get_accesstoken_url}`; 
    }
    public static GetUserInfoUrl(){
        return `${environment.get_userinfo_url}`; 
    }
    public static GetRegisterUrl(){
        return `${environment.register_url}`;
    }
}