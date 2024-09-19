// import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
// import { LocalStorageSerice } from "../local-storage/local-storeage-service";
// import { UrlDefine } from "../../commons/url-define";
// import { Injectable } from "@angular/core";
// @Injectable()
// export class AuthGuard implements CanActivate {

//     constructor(private router: Router, private localStorageService: LocalStorageSerice) { }

//     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//         console.log('test guard');
//         if (this.localStorageService.isLoggedIn()) {
//             return true;
//         }
//         var currentUrl = state.url;
//         this.router.navigate([UrlDefine.RegisterGamerPage, currentUrl]);
//         return false;
//     }

// }