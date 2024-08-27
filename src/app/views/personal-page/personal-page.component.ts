import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UrlDefine } from '../../commons/url-define';

@Component({
  selector: 'app-personal-page',
  templateUrl: './personal-page.component.html',
  styleUrl: './personal-page.component.scss'
})
export class PersonalPageComponent implements OnInit{

  constructor(private router: Router){}

  ngOnInit(): void {
    
  }

  onNavPersonalPage(){
    this.router.navigateByUrl(UrlDefine.PersonalPage);
  }

  onNaReportCommonPage(){
    this.router.navigateByUrl(UrlDefine.ReportCommonPage);
  }
}
