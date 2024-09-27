import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, inject, ChangeDetectorRef } from "@angular/core";
import { SpinnerPageComponent } from "../views/defaults/spinner/spinner-page/spinner-page.component";
import { Observable } from "rxjs";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { UserService } from "../services/user-service";
import { LocalStorageSerice } from "../core/local-storage/local-storeage-service";
import { GetAccessTokenRequest } from "../request/get-access-token-request";
import { AuthenModel } from "../models/authen-model";
import { UserModel, UserModelBasic } from "../models/user-model";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CommunicateService } from "../services/base-services/communicate-service";

@Component({
  template: ''
})
export class BasePageComponent implements OnInit, OnDestroy, AfterViewInit {

  userService = inject(UserService);
  localStorageService = inject(LocalStorageSerice);
  activatedRoute = inject(ActivatedRoute);
  snackBar = inject(MatSnackBar);
  communicateService = inject(CommunicateService);


  isLogin: boolean = false;
  userModel: UserModelBasic | undefined;

  constructor() {
    this.initConfiguration();
    if (this.localStorageService.getToken() && this.localStorageService.getToken().length > 0) {
      this.isLogin = true;
      this.userModel = this.localStorageService.getUserInfo();
    }
  }

  initConfiguration() {
    this.isSetLoading();
    if (this.localStorageService.getDateLogin() && this.localStorageService.getExpireSecond() > 0) {
      var dateLogin = this.localStorageService.getDateLogin() ?? new Date();
      if (((new Date()).getTime() / 1000) > (dateLogin?.getTime() / 1000 + this.localStorageService.getExpireSecond())) {
        this.localStorageService.clean();
        window.location.replace(window.location.pathname);
      }
    }

    this.activatedRoute?.queryParams.subscribe((params: Params) => {
      if (params != undefined && params['code'] != undefined) {
        let accessTokenRequest: GetAccessTokenRequest = {
          code: params['code']
        };
        this.userService?.GetAccessToken(accessTokenRequest).subscribe({
          next: (res) => {
            if (res) {
              if (res.status) {
                var data: AuthenModel = res.data;
                this.localStorageService?.setToken(data.token ?? '');
                this.localStorageService?.setUserInfo(data.userInfo);
                this.localStorageService.setExpireSecond(data.expires_in ?? 0);
                let date = new Date();
                this.localStorageService.setDateLogin(date.toISOString());
                this.isLogin = true;
                this.userModel = data.userInfo;
                this.communicateService.setIsLogin(true);
              }
              this.unSetLoading();
            }
          },
          error: (error) => {
          }
        });
      }
    });
  }

  @ViewChild(SpinnerPageComponent)
  spinnerPageComponent?: SpinnerPageComponent;

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }

  public pageIndex = 1;
  public pageSize = 10;
  public isLoading = false;

  ngAfterViewInit(): void {
    if (this.spinnerPageComponent) {
      this.spinnerPageComponent.viewLoading$ = new Observable<boolean>(
        observer => {
          return observer.next(this.isLoading);
        }
      );
      this.spinnerPageComponent.ngShowSpinner(this.isLoading);
    }
  }
  public isSetLoading() {
    this.isLoading = true;
    if (this.spinnerPageComponent) {
      this.spinnerPageComponent.ngShowSpinner(this.isLoading);
    }
  }
  public unSetLoading() {
    this.isLoading = false;
    if (this.spinnerPageComponent) {
      this.spinnerPageComponent.ngShowSpinner(this.isLoading);
    }
  }
  onLogout() {
    this.isLogin = false;
    this.localStorageService.clean();
    window.location.replace(window.location.pathname);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: ["style-snackbar"]
    });
  }
}