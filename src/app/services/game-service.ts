import { Injectable } from "@angular/core";
import { HttpClientService } from "./base-services/http-client-service";
import { BaseRequest } from "../request/base-request";
import { Observable } from "rxjs";
import { UrlAPIDefine } from "../commons/url-api-define";
import { BaseListRespone } from "../response/base-response";

@Injectable({
    providedIn: 'root'
})
export class GameService {
    constructor(private httpClient: HttpClientService) { }

    Get(request: BaseRequest): Observable<BaseListRespone> {
        return this.httpClient.getJsonAuthenObservable(UrlAPIDefine.GetListService, request);
    }
}