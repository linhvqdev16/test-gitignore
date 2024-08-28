import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
    template: ''
  })
export class BasePageComponent{

    constructor(){}

    public pageIndex = 1; 
    public pageSize = 10; 
}