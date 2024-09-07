import { Injectable } from "@angular/core";
import { HttpClientService } from "./base-services/http-client-service";
import { GetInfluencerByScoinIdRequest } from "../request/influencer/get-influencer-by-scoin-id-request";
import { Observable } from "rxjs";
import { UrlAPIDefine } from "../commons/url-api-define";
import { BaseRespone } from "../response/base-response";

@Injectable({
    providedIn: 'root'
})
export class InfluencerService{

    constructor(private httpClient: HttpClientService){
    };


    GetByScoinId(request: GetInfluencerByScoinIdRequest) : Observable<BaseRespone>{
        return this.httpClient.getJsonAuthenObservable(UrlAPIDefine.GetInfluencerByScoinId, request);
    }

}