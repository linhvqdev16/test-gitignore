import { Injectable } from "@angular/core";
import { HttpClientService } from "./base-services/http-client-service";
import { GetServerRequest } from "../request/get-server-request";
import { Observable } from "rxjs";
import { BaseListRespone, BaseRespone } from "../response/base-response";
import { UrlAPIDefine } from "../commons/url-api-define";
import { GetAccessTokenRequest } from "../request/get-access-token-request";
import { GetRoleRequest } from "../request/get-role-request";

@Injectable({providedIn: 'root'})
export class UserService{
    constructor(private httpClient: HttpClientService){}

    GetServer(request: GetServerRequest): Observable<BaseListRespone>{
        return this.httpClient.postJsonAuthenObservable(UrlAPIDefine.GetServer, request);
    }
    GetAccessToken(request: GetAccessTokenRequest) : Observable<BaseRespone>{
        return this.httpClient.getJsonAuthenObservable(UrlAPIDefine.GetAcessToken, request);
    }
    GetRole(request: GetRoleRequest) : Observable<BaseListRespone>{
        return this.httpClient.getJsonAuthenObservable(UrlAPIDefine.GetRole, request); 
    }
}