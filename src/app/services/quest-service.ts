import { Injectable } from "@angular/core";
import { HttpClientService } from "./base-services/http-client-service";
import { GetQuestByMissionRequest } from "../request/get-quest-by-mission-request";
import { Observable } from "rxjs";
import { BaseRespone } from "../response/base-response";
import { UrlAPIDefine } from "../commons/url-api-define";

@Injectable({
    providedIn: 'root'
})
export class QuestService{
    constructor(private httpClient: HttpClientService){}

    GetQuestByMissionId(request: GetQuestByMissionRequest) : Observable<BaseRespone>{
        return this.httpClient.getJsonAuthenObservable(UrlAPIDefine.GetQuestByMissionId, request);
    }
}