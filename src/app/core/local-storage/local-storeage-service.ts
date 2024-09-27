import { LocalStorageKey } from "./local-storage-key";
import { UserModel, UserModelBasic } from "../../models/user-model";
import { inject, Injectable, PLATFORM_ID } from "@angular/core";
import { DatePipe, isPlatformBrowser } from "@angular/common";

@Injectable({
    providedIn: 'root'
})
export class LocalStorageSerice {

    platformId = inject(PLATFORM_ID);

    clean(): void {
        localStorage.clear();
    }
    getToken(): string {
        return localStorage.getItem(LocalStorageKey.TOKEN) ?? '';
    }
    setToken(token: string) {
        localStorage.setItem(LocalStorageKey.TOKEN, token);
    }
    removeToken(): void {
        localStorage.removeItem(LocalStorageKey.TOKEN);
    }
    getUserInfo(): UserModelBasic {
        let userModel: UserModelBasic = {};
        if (localStorage.getItem(LocalStorageKey.USER_ID)) {
            userModel = JSON.parse(localStorage.getItem(LocalStorageKey.USER_ID) ?? '');
        }
        return userModel;
    }
    setUserInfo(model?: UserModelBasic): void {
        localStorage.setItem(LocalStorageKey.USER_ID, model == undefined || model == null ? '' : JSON.stringify(model));
    }
    isLoggedIn(): boolean {
        if (this.getToken()) {
            return true;
        }
        return false;
    }
    setExpireSecond(expire: number) {
        localStorage.setItem(LocalStorageKey.EXPIRE, expire.toString());
    }
    getExpireSecond() {
         var result : number = +(localStorage.getItem(LocalStorageKey.EXPIRE) ?? 0);
        return result;
    }
    setDateLogin(date: string) {
        localStorage.setItem(LocalStorageKey.DATE_LOGIN, date);
    }


    getDateLogin() {
        let date = localStorage.getItem(LocalStorageKey.DATE_LOGIN);
        if (date && date.length > 0) {
            return new Date(date);
        }
        return null;
    }
}