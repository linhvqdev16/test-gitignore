import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-spinner-page',
  templateUrl: './spinner-page.component.html',
  styleUrl: './spinner-page.component.scss'
})
export class SpinnerPageComponent {

  constructor(private spinner: NgxSpinnerService){}

  ngShowSpinner(bol: boolean){
    debugger;
    if(bol && bol != undefined){
      this.spinner.show();
    }else{
      this.spinner.hide();
    }
  }

}
