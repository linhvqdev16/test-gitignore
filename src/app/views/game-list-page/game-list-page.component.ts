import { CommonModule, DOCUMENT } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { SlickCarouselComponent, SlickCarouselModule } from 'ngx-slick-carousel';
import { ServiceModel } from '../../models/service-model';
import { GameService } from '../../services/game-service';
import { BaseRequest } from '../../request/base-request';
import { BasePageComponent } from '../../commons/base-page-component';
import { SampleComponent } from '../sample/sample.component';

@Component({
  selector: 'app-game-list-page',
  standalone: true,
  imports: [CommonModule, SlickCarouselModule],
  templateUrl: './game-list-page.component.html',
  styleUrl: './game-list-page.component.scss'
})
export class GameListPageComponent extends BasePageComponent implements OnInit, AfterViewInit {

  serviceList: Array<ServiceModel> | undefined;

  @ViewChild(SampleComponent)
  sampleComponent?: SampleComponent;

  constructor(private gameService: GameService, private cdr: ChangeDetectorRef) {
    super();
  }
  override ngOnInit(): void {
    this.onGetServiceList();
  }

  ngAfterViewInit(): void {
    console.log('value', this.sampleComponent);
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
    ]
  }


  onGetServiceList() {
    this.isSetLoading();
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
            this.unSetLoading();
          }
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  slickInit() {
    console.log('slick initialized');
  }

  breakpoint() {
    console.log('breakpoint');
  }

  afterChange() {
    console.log('afterChange');
  }

  beforeChange() {
    console.log('beforeChange');
  }

}
