import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UrlDefine } from '../../../commons/url-define';

@Component({
  selector: 'app-report-common',
  templateUrl: './report-common.component.html',
  styleUrl: './report-common.component.scss'
})
export class ReportCommonComponent implements OnInit {

  indexTabReport: number = 0;
  classTagReportDefault: string = "card-link";

  constructor(private router: Router) { }
  ngOnInit(): void {

  }
  onNavPersonalPage() {
    this.router.navigateByUrl(UrlDefine.PersonalPage);
  }
  onNaReportCommonPage() {
    this.router.navigateByUrl(UrlDefine.ReportCommonPage);
  }

  onChangeIndexReport(index: number): void {
    this.indexTabReport = index;
  }

  onGetClassTagReport(index: number): string {
    if (this.indexTabReport == index) {
      return this.classTagReportDefault + " active";
    }
    return this.classTagReportDefault;
  }

}
