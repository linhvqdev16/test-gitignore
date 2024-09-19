import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UrlDefine } from '../../../commons/url-define';
import { HttpClient, HttpHeaders, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { catchError, map, Observable, switchMap } from 'rxjs';
import { CommunicateService } from '../../../services/base-services/communicate-service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {

  constructor(private router: Router, private communicationService: CommunicateService) {
  }
  httpClient = inject(HttpClient);
  public data: Array<any> = [];

  ngOnInit(): void {
  }

  onNavRegister(): void {
    this.communicationService.setAction(0);
    this.router.navigateByUrl(UrlDefine.RegisterGamerPage);
  }
  onNavListGame(): void {
    this.router.navigateByUrl(UrlDefine.GameListPage);
  }
  onNavListQuest(): void {
    this.router.navigateByUrl(UrlDefine.QuestPage);
  }
  onNavProfilePage(): void {
    this.router.navigateByUrl(UrlDefine.PersonalPage);
  }
}
