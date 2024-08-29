import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { SpinnerPageComponent } from "../views/defaults/spinner/spinner-page/spinner-page.component";
import { SampleComponent } from "../views/sample/sample.component";

@Component({
  template: ''
})
export class BasePageComponent implements OnInit, OnDestroy{

  constructor() { }

  // @ViewChild(SampleComponent)
  // sampleComponent?: SampleComponent;



   ngOnDestroy(): void {
     
   }

   ngOnInit(): void {
     
   }

  public pageIndex = 1;
  public pageSize = 10;
  public isLoading = false;

  public isSetLoading() {
    debugger;
    this.isLoading = true;
    // this.spinnerPageComponent?.ngShowSpinner(this.isLoading);
  }
  public unSetLoading() {
    this.isLoading = false;
    // this.spinnerPageComponent?.ngShowSpinner(this.isLoading);
  }
}