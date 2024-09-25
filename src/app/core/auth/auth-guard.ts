import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { LocalStorageSerice } from "../local-storage/local-storeage-service";
import { UrlDefine } from "../../commons/url-define";
import { Injectable } from "@angular/core";
import { CommunicateService } from "../../services/base-services/communicate-service";
import { MatDialog } from "@angular/material/dialog";
@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private localStorageService: LocalStorageSerice, private communicateService: CommunicateService, private dialog: MatDialog) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.localStorageService.isLoggedIn()) {
            return true;
        } else {
            console.log('token : ' + this.localStorageService.getToken());
            if (this.localStorageService.getToken().length == 0) {
                this.communicateService.setAuthen(1);
                this.router.navigateByUrl(UrlDefine.HomePage);
            }
            return false;
        }
    }

}