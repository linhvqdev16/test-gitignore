import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, inject } from "@angular/core";
import { SpinnerPageComponent } from "../views/defaults/spinner/spinner-page/spinner-page.component";
import { Observable } from "rxjs";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { UserService } from "../services/user-service";
import { LocalStorageSerice } from "../core/local-storage/local-storeage-service";
import { GetAccessTokenRequest } from "../request/get-access-token-request";
import { AuthenModel } from "../models/authen-model";

@Component({
  template: ''
})
export class BasePageComponent implements OnInit, OnDestroy, AfterViewInit {

  userService = inject(UserService);
  localStorageService = inject(LocalStorageSerice);
  activatedRoute = inject(ActivatedRoute);

  constructor() {
    this.initConfiguration();
  }

  initConfiguration() {
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
                console.log(data);
                this.localStorageService?.setToken(data.token ?? '');
                this.localStorageService?.setScoinCode(params['code']);
                this.localStorageService?.setUserInfo(data.userInfo);
              }
            }
          },
          error: (error) => {
            console.log(error);
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
}