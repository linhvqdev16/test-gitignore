import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UrlDefine } from '../../../commons/url-define';

@Component({
  selector: 'app-footer-page',
  templateUrl: './footer-page.component.html',
  styleUrls: [
    './footer-page.component.scss', 
    './footer-page.component.scss'
  ]
})
export class FooterPageComponent implements OnInit {

  constructor(private router: Router){}

  ngOnInit(): void {
  }

  ngNavigate(url: string){
    window.open(url, 'blank');
  }

  onNavListGame(){
    this.router.navigateByUrl(UrlDefine.GameListPage); 
  }
  onNavMissionPage(){
    this.router.navigateByUrl(UrlDefine.QuestPage); 
  }
  onNavPersonalPage(){
    this.router.navigateByUrl(UrlDefine.PersonalPage);
  }

}
