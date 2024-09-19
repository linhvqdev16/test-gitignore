import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { catchError, finalize, Observable, throwError } from "rxjs";
import { UrlAPIDefine } from "../../commons/url-api-define";
import { Injectable } from "@angular/core";
import { LocalStorageSerice } from "../../core/local-storage/local-storeage-service";
import { Router } from "@angular/router";
import { UserService } from "../user-service";
import { Common } from "../../commons/common";
import { NgxSpinnerService } from "ngx-spinner";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

    private isRefreshing: boolean = false;

    constructor(private localStorageService: LocalStorageSerice, private router: Router, private userService: UserService, private spinner: NgxSpinnerService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinner.show();
        return next.handle(req).pipe(
            catchError((error) => {
                console.log('Global error: ' + error.message);
                if (error instanceof HttpErrorResponse && !req.url.includes(UrlAPIDefine.GetAcessToken) && (error.status == 401 || error.status == 403)) {
                    return this.handle401Error(req, next);
                }
                return throwError(() => error)
            }),
            finalize(() => this.spinner.hide())
        )
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        // this.isRefreshing = true;
        // let loginUrl: string = "";
        // loginUrl = Common.GetAuthorUrl();
        // loginUrl = loginUrl.replace('clientValue', Common.GetClienId());
        // let originUrl: string = encodeURI(window.location.href);
        // loginUrl = loginUrl.replace('redirecUrl', originUrl);
        // loginUrl = loginUrl.replace('agencyValue', '0');
        // window.open(loginUrl);
        this.localStorageService.clean();
        return next.handle(request);
    }
}

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];