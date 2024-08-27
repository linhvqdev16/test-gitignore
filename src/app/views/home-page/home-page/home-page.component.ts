import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UrlDefine } from '../../../commons/url-define';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {

  constructor(private router: Router){
  }

  ngOnInit(): void {
  }
  onNavRegister(): void{
    this.router.navigateByUrl(UrlDefine.RegisterGamerPage);
  }
  onNavListGame(): void{
    this.router.navigateByUrl(UrlDefine.GameListPage);
  }
  onNavListQuest(): void{
    this.router.navigateByUrl(UrlDefine.QuestPage);
  }
  onNavProfilePage(): void{
    this.router.navigateByUrl(UrlDefine.PersonalPage);
  }
}
