import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { LocalStorageSerice } from "../local-storage/local-storeage-service";
import { UrlDefine } from "../../commons/url-define";
import { Injectable } from "@angular/core";
import { CommunicateService } from "../../services/base-services/communicate-service";
import { MatDialog } from "@angular/material/dialog";
import { BasePageComponent } from "../../commons/base-page-component";
@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private localStorageService: LocalStorageSerice, private communicateService: CommunicateService, private dialog: MatDialog) {
    }

    isLogin: boolean = false;

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.localStorageService.getToken().length > 0) {
            return true;
        }
        this.communicateService.setAuthen(1);
        this.router.navigateByUrl(UrlDefine.HomePage);
        return false;
    }
}