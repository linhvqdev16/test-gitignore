import { LocalStorageKey } from "./local-storage-key";
import { UserModel } from "../../models/user-model";
import { inject, Injectable, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

@Injectable({
    providedIn: 'root'
})
export class LocalStorageSerice {

    platformId = inject(PLATFORM_ID);

    clean(): void {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.clear();
        }
    }
    getToken(): string {
        if (isPlatformBrowser(this.platformId)) {
            return localStorage.getItem(LocalStorageKey.TOKEN) ?? '';
        }
        return '';
    }
    setToken(token: string) {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(LocalStorageKey.TOKEN, token);
        }
    }
    removeToken(): void {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem(LocalStorageKey.TOKEN);
        }
    }
    getUserInfo(): UserModel {
        let userModel: UserModel = {};
        if (isPlatformBrowser(this.platformId)) {
            if (localStorage.getItem(LocalStorageKey.USER_ID)) {
                userModel = JSON.parse(localStorage.getItem(LocalStorageKey.USER_ID) ?? '');
            }
        }
        return userModel;
    }
    setUserInfo(model?: UserModel): void {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(LocalStorageKey.USER_ID, model == undefined || model == null ? '' : JSON.stringify(model));
        }
    }
    isLoggedIn(): boolean {
        if (isPlatformBrowser(this.platformId)) {
            var model = this.getUserInfo();
            if (model) {
                return true;
            }
        }
        return false;
    }
}