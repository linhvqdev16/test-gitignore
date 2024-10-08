import { Injectable, signal } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CommunicateService {
    /*
       action:
        0: add new influencer
        1: update influencer
    */
    private action = signal(0);

    public setAction(data: number) {
        this.action.set(data);
    }
    public getAction(): number {

        let str = this.action.toString().replaceAll("[", '').replaceAll("]", '');
        var array = str.split(":");
        return Number(array[1] && array[1].length > 0 ? array[1].trim() : '0');
    }

    private serviceIdSbj = new BehaviorSubject<number>(0); 
    serviceId = this.serviceIdSbj.asObservable(); 
    public setServiceId(data: number) {
        this.serviceIdSbj.next(data);
    }
    // public getServiceId() {
    //     let str = this.serviceId.toString().replaceAll("[", '').replaceAll("]", '');
    //     var array = str.split(":");
    //     return Number(array[1] && array[1].length > 0 ? array[1].trim() : '0');
    // }
    
   
    private unAutherization = new BehaviorSubject<number>(0);
    currentAuthen = this.unAutherization.asObservable();
    public setAuthen(value: number) {
        this.unAutherization.next(value);
    }

    private isLogin = new BehaviorSubject<boolean>(false); 
    isLogged = this.isLogin.asObservable(); 
    public setIsLogin(value: boolean){
        this.isLogin.next(value);
    }
}