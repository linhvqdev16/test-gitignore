import { CommonModule, DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit, } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ServiceModel } from '../../models/service-model';
import { GameService } from '../../services/game-service';
import { BaseRequest } from '../../request/base-request';
import { BasePageComponent } from '../../commons/base-page-component';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UrlDefine } from '../../commons/url-define';
import { CommunicateService } from '../../services/base-services/communicate-service';

@Component({
  selector: 'app-game-list-page',
  standalone: true,
  imports: [CommonModule, SlickCarouselModule],
  templateUrl: './game-list-page.component.html',
  styleUrl: './game-list-page.component.scss'
})
export class GameListPageComponent extends BasePageComponent implements OnInit {

  serviceList: Array<ServiceModel> | undefined;

  constructor(private gameService: GameService, private cdr: ChangeDetectorRef, private spinner: NgxSpinnerService, private router: Router, private communicateSerivce: CommunicateService) {
    super();
  }
  override ngOnInit(): void {
    this.onGetServiceList();
  }
  slideConfig = {
    "slidesToShow": 2,
    "slidesToScroll": 4,
    "dots": true,
    "infinite": true,
    "centerMode": true,
    "centerPadding": '340px',
    "responsive": [
      {
        "breakpoint": 992,
        "settings": {
          "infinite": true,
          "slidesToShow": 1,
          "slidesToScroll": 3,
          "centerPadding": '203px'
        },
      }
    ],
    "customPaging": function (slick: any, i: any) {
      return '<a>' + (i + 1) + '</a>';
    }
  }


  onGetServiceList() {
    this.serviceList = new Array<ServiceModel>();
    let baseRequest: BaseRequest = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    }
    this.gameService.Get(baseRequest).subscribe({
      next: (result) => {
        if (result) {
          if (result.code == 1) {
            this.serviceList = result.data;
            this.cdr.detectChanges();
          }
        }
      },
      error: (error) => {
        // console.log(error);
        this.openSnackBar(error.message ?? '', '');
        this.cdr.detectChanges();
      }
    });
  }

  slickInit() {
  }

  breakpoint() {
  }

  afterChange() {
  }

  beforeChange() {
  }

  onNavInfluencerPage(item: ServiceModel) {
    console.log("Click item: " + item.serviceId);
    this.communicateSerivce.setServiceId(item.serviceId ?? 1);
    this.router.navigateByUrl(UrlDefine.InfluencerPage);
  }
}
