import { Injectable } from "@angular/core";
import { HttpClientService } from "./base-services/http-client-service";
import { GetInfluencerByScoinIdRequest } from "../request/influencer/get-influencer-by-scoin-id-request";
import { Observable } from "rxjs";
import { UrlAPIDefine } from "../commons/url-api-define";
import { BaseRespone } from "../response/base-response";
import { GetInfluencerByCodeRequest } from "../request/get-influencer-by-code-request";
import { RegisterInfluencerRequest } from "../request/influencer/register-influencer-request";
import { GetInfluencerByServiceIdrRequest } from "../request/influencer/get-influencer-by-game-id";
import { AddOrChangeSupportRequest } from "../models/add-or-change-support-request";

@Injectable({
    providedIn: 'root'
})
export class InfluencerService {
    constructor(private httpClient: HttpClientService) {
    };
    GetByScoinId(request: GetInfluencerByScoinIdRequest): Observable<BaseRespone> {
        return this.httpClient.getJsonAuthenObservable(UrlAPIDefine.GetInfluencerByScoinId, request);
    }
    GetByCode(request: GetInfluencerByCodeRequest): Observable<BaseRespone> {
        return this.httpClient.getJsonAuthenObservable(UrlAPIDefine.GetInfluencerByCode, request);
    }
    Register(request: RegisterInfluencerRequest): Observable<BaseRespone> {
        return this.httpClient.postJsonAuthenObservable(UrlAPIDefine.RegisterInfluencer, request);
    }
    GetByServiceId(request: GetInfluencerByServiceIdrRequest): Observable<BaseRespone> {
        return this.httpClient.getJsonAuthenObservable(UrlAPIDefine.GetInfluencerByServiceId, request);
    }
    SubmitSupport(request: AddOrChangeSupportRequest) : Observable<BaseRespone>{
        return this.httpClient.postJsonAuthenObservable(UrlAPIDefine.SubmitSupport, request);
    }
}