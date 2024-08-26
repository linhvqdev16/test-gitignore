import { HttpClient, HttpHeaders, HttpParams, HttpParamsOptions } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { json } from "stream/consumers";
import { Observable, share } from "rxjs";
import { Common } from "../../commons/common";

@Injectable({
    providedIn: 'root',
    useClass: HttpClientService,
    deps: [HttpClient]
})
export class HttpClientService {
    constructor(private http: HttpClient, private router: Router
    ) { }
    unableConnectToServer = {
        json: function () {
            return {
                status: false,
                message: ["Unanle connect to server"]
            };
        }
    };
    unauthorizedObject = {
        json: function () {
            return {
                status: false,
                message: ["Unauthorzed"]
            };
        }
    };
    private handleErrorObservable(obj: any) {
        const request = obj;
        const promise = request.toPromise();
        promise.catch(async (err: any) => {
            if (err.status === 401) {
                ///Check Login  await 
            } else if (err.status === 403) {
                ///Permistion denied
            }
        })
    }
    // private converBlodToString(blod: any) {
    //     var url, xmlHttp: any;
    //     url = URL.createObjectURL(blod);
    //     xmlHttp = new XMLHttpRequest();
    //     xmlHttp.open('GET', url, false);
    //     xmlHttp.send();
    //     URL.revokeObjectURL(url);
    //     return xmlHttp.responseText;
    // }

    // private handlerError(error: any): Promise<any> {
    //     let errorObject: any;
    //     switch (error.status) {
    //         case 0:
    //             {
    //                 errorObject = {
    //                     status: false,
    //                     message: ["Can not connect to server"]
    //                 };
    //             }
    //             break;
    //         case 401:
    //             {
    //                 errorObject = {
    //                     status: false,
    //                     message: ["Unauthorized"]
    //                 };
    //             }
    //             break;
    //         case 403:
    //             {
    //                 errorObject = {
    //                     status: false,
    //                     message: ["Permission denied"]
    //                 };
    //             }
    //             break;
    //         case 404:
    //             {
    //                 errorObject = {
    //                     status: false,
    //                     message: ["Not found"]
    //                 };
    //             }
    //             break;
    //         default:
    //             {
    //                 var message = error.statusText;
    //                 if (error.error instanceof Blob) {
    //                     message = this, this.converBlodToString(error.error);
    //                 }
    //                 errorObject = {
    //                     status: false,
    //                     message: [error.status + " : " + message]
    //                 };
    //                 break;
    //             }
    //     }
    //     return Promise.resolve(errorObject);
    // }
    postJsonObservable(absolutePath: string, obj: any = {}): Observable<any> {
        const url: string = Common.GetUrl(absolutePath);
        const header: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
        let respone = this.http.post(url, obj, { headers: header })
            .pipe(share());
        this.handleErrorObservable(respone);
        return respone;
    }
    postJsonAuthenObservable(absolutePath: string, obj: any): Observable<any> {
        const url: string = Common.GetUrl(absolutePath);
        const token: string = Common.GetAuthenToken();
        const header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
        let respone = this.http.post(url, obj, { headers: header })
            .pipe(share());
        this.handleErrorObservable(respone);
        return respone;
    }
    getJsonAuthenObservable(absolutePath: string, obj: any): Observable<any> {
        const url: string = Common.GetUrl(absolutePath);
        const token: string = Common.GetAuthenToken();
        const header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
        const httpParams: HttpParamsOptions = { fromObject: obj } as HttpParamsOptions;
        const options = { params: new HttpParams(httpParams), header: header };
        let respone = this.http.get(url, options)
            .pipe(share());
        this.handleErrorObservable(respone);
        return respone;
    }
    deleteJsonAuthenObservale(absolutePath: string, obj: any): Observable<any> {
        const url: string = Common.GetUrl(absolutePath);
        const token: string = Common.GetAuthenToken();
        const header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
        let response = this.http.delete(url, { headers: header, body: obj }).pipe(share());
        this.handleErrorObservable(response);
        return response;
    }
    putJsonAuthenObservable(absolutePath: string, obj: any): Observable<any> {
        const url: string = Common.GetUrl(absolutePath);
        const token: string = Common.GetAuthenToken();
        const header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
        let response = this.http.put(url, obj, { headers: header });
        this.handleErrorObservable(response);
        return response;
    }
    patchJsonAuthenObservable(absolutePath: string, obj: any): Observable<any> {
        const url: string = Common.GetUrl(absolutePath);
        const token: string = Common.GetAuthenToken();
        const header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
        let response = this.http.patch(url, obj, { headers: header });
        this.handleErrorObservable(response);
        return response;
    }
    downladBlobAuthenObservable(absolutePath: string, obj: any): Observable<any> {
        const url: string = Common.GetUrl(absolutePath);
        const token: string = Common.GetAuthenToken();
        const header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
        let respone = this.http.post(url, obj, {
            responseType: 'blob',
            headers: header
        });
        this.handleErrorObservable(respone);
        return respone;
    }
}