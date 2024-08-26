import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UrlDefine } from '../../../../commons/url-define';

@Component({
  selector: 'app-header-page',
  templateUrl: './header-page.component.html',
  styleUrls: [
    './header-page.component.scss',
  ],
})
export class HeaderPageComponent implements OnInit {

  private returlUrl: string | undefined;


  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log('header component');
  }
  ngQuest(): void {
    debugger;
    this.router?.navigateByUrl(UrlDefine.QuestPage);
  }
  ngHome(): void{
    debugger;
    this.router.navigateByUrl(UrlDefine.HomePage);
  }
}
