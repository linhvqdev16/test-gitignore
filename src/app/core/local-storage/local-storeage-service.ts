import { LocalStorageKey } from "./local-storage-key";
import { UserModel } from "../../models/user-model";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class LocalStorageSerice {

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
    getUserInfo(): UserModel {
        return JSON.parse(localStorage.getItem(LocalStorageKey.USER_ID) ?? '');
    }
    setUserInfo(model?: UserModel): void {
        localStorage.setItem(LocalStorageKey.USER_ID, model == undefined || model == null ? '' : JSON.stringify(model));
    }
    isLoggedIn(): boolean {
        debugger;
        var model = this.getUserInfo();
        if (model) {
            return true;
        }
        return false;
    }
    getScoinCode() {
        return localStorage.getItem(LocalStorageKey.SCOIN_CODE) ?? '';
    }
    setScoinCode(code: string): void {
        localStorage.setItem(LocalStorageKey.SCOIN_CODE, code);
    }
}