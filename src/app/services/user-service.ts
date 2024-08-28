import { Injectable } from "@angular/core";
import { HttpClientService } from "./base-services/http-client-service";
import { GetServerRequest } from "../request/get-server-request";
import { Observable } from "rxjs";
import { BaseListRespone } from "../response/base-response";
import { UrlAPIDefine } from "../commons/url-api-define";

@Injectable({providedIn: 'root'})
export class UserService{
    constructor(private httpClient: HttpClientService){}

    GetServer(request: GetServerRequest): Observable<BaseListRespone>{
        return this.httpClient.postJsonAuthenObservable(UrlAPIDefine.GetServer, request);
    }
}