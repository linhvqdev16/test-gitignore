import { Injectable } from "@angular/core";
import { HttpClientService } from "./base-services/http-client-service";
import { Observable } from "rxjs";
import { BaseRespone } from "../response/base-response";
import { UrlAPIDefine } from "../commons/url-api-define";
import { GetListMissionRequest } from "../request/get-list-mission-request";

@Injectable({
    providedIn: 'root'
})
export class MissionService {

    constructor(private httpClient: HttpClientService) {

    }

    Get(request: GetListMissionRequest): Observable<BaseRespone>{
        return this.httpClient.getJsonAuthenObservable(UrlAPIDefine.GetListMission, request);
    }
}