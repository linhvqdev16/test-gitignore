import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class LocalStorage {
    constructor() { }

    getToken(): string {
        return localStorage.getItem('token') ?? '';
    }

    setToken(token: string) {
        localStorage.setItem('token', token);
    }

    removeToken() {
        localStorage.removeItem('token');
    }
}