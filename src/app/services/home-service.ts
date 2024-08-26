import { Injectable } from "@angular/core";
import { HttpClientService } from "./base-services/http-client-service";

@Injectable({
    providedIn: 'root'
}
)
export class HomeService {
    constructor(private httpClient: HttpClientService) { }

    addCaculator(x: number, y: number): number{
        return x + y;
    }
}