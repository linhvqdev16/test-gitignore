import { Injectable } from "@angular/core";
import { HttpClientService } from "./base-services/http-client-service";

@Injectable({
    providedIn: 'root'
})
export class InfluencerService{

    constructor(private httpClient: HttpClientService){

    };


    

}