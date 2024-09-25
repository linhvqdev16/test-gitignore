import { HttpClient, HttpHeaders, HttpParams, HttpParamsOptions } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { json } from "stream/consumers";
import { catchError, finalize, map, Observable, share, tap } from "rxjs";
import { Common } from "../../commons/common";
import { error } from "console";
import { LocalStorageSerice } from "../../core/local-storage/local-storeage-service";

@Injectable({
    providedIn: 'root',
    useClass: HttpClientService,
    deps: [HttpClient]
})
export class HttpClientService {

    localStorageSerice= inject(LocalStorageSerice);

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
        let errObject;
        // console.log(obj.message);
        return Promise.resolve(errObject);
    }
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
        const token: string = this.localStorageSerice.getToken();
        const header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
        return this.http.post(url, obj, { headers: header })
            .pipe(map((response) => {
                return response;
            }), catchError((error) => {
                // console.log('error: ' + error.message);
                const errorObj = { statusCode: error.status, errorMessage: error.message, dateTime: new Date() }
                return this.handleErrorObservable(error);
            }));
    }
    getJsonObservable(absolutePath: string, obj: any): any {
        const url: string = Common.GetUrl(absolutePath);
        const header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        const httpParams: HttpParamsOptions = { fromObject: obj } as HttpParamsOptions;
        return this.http.get(
            url
            , { headers: header, params: new HttpParams(httpParams) }
        ).subscribe({
            next: (data: any) => {
            //   console.log(data);
              return data;
            }, error: (err) => err
          });
    }
    getJsonAuthenObservable(absolutePath: string, obj: any): Observable<any> {
        const url: string = Common.GetUrl(absolutePath);
        const token: string = this.localStorageSerice.getToken();
        const header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
        const httpParams: HttpParamsOptions = { fromObject: obj } as HttpParamsOptions;
        return this.http.get(
            url
            , { headers: header, params: new HttpParams(httpParams) }
        ).pipe(map((response) => {
            // console.log(response);
            return response;
        }));
    }
    deleteJsonAuthenObservale(absolutePath: string, obj: any): Observable<any> {
        const url: string = Common.GetUrl(absolutePath);
        const token: string = this.localStorageSerice.getToken();
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
        const token: string = this.localStorageSerice.getToken();
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
        const token: string = this.localStorageSerice.getToken();
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
        const token: string = this.localStorageSerice.getToken();
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