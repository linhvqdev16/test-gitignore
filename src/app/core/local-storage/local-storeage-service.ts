import { LocalStorageKey } from "./local-storage-key";
import { UserModel, UserModelBasic } from "../../models/user-model";
import { inject, Injectable, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

@Injectable({
    providedIn: 'root'
})
export class LocalStorageSerice {

    platformId = inject(PLATFORM_ID);

    clean(): void {
        // if (isPlatformBrowser(this.platformId)) {
        //     localStorage.clear();
        // }
        localStorage.clear();
    }
    getToken(): string {
        // if (isPlatformBrowser(this.platformId)) {
        //     return localStorage.getItem(LocalStorageKey.TOKEN) ?? '';
        // }
        return localStorage.getItem(LocalStorageKey.TOKEN) ?? '';
    }
    setToken(token: string) {
        // if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem(LocalStorageKey.TOKEN, token);
        // }
    }
    removeToken(): void {
        // if (isPlatformBrowser(this.platformId)) {
        localStorage.removeItem(LocalStorageKey.TOKEN);
        // }
    }
    getUserInfo(): UserModelBasic {
        let userModel: UserModelBasic = {};
        // if (isPlatformBrowser(this.platformId)) {
        if (localStorage.getItem(LocalStorageKey.USER_ID)) {
            userModel = JSON.parse(localStorage.getItem(LocalStorageKey.USER_ID) ?? '');
        }
        // }
        return userModel;
    }
    setUserInfo(model?: UserModelBasic): void {
        // if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem(LocalStorageKey.USER_ID, model == undefined || model == null ? '' : JSON.stringify(model));
        // }
    }
    isLoggedIn(): boolean {
        // if (isPlatformBrowser(this.platformId)) {
        if (this.getToken()) {
            return true;
            // }
        }
        return false;
    }
}