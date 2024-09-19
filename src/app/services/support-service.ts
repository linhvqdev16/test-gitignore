import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UnSupportRequest } from "../request/support/un-support-request";
import { Observable } from "rxjs";
import { BaseRespone } from "../response/base-response";
import { UrlAPIDefine } from "../commons/url-api-define";
import { HttpClientService } from "./base-services/http-client-service";

@Injectable({providedIn: 'root'})
export class SupportService{
    constructor(private httpClient: HttpClientService){}

    UnSupport(request: UnSupportRequest) : Observable<BaseRespone>{
        return this.httpClient.postJsonAuthenObservable(UrlAPIDefine.UnSupport, request);
    }
}