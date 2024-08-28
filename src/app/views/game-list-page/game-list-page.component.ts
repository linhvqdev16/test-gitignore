import { CommonModule, DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { SlickCarouselComponent, SlickCarouselModule } from 'ngx-slick-carousel';
import { ServiceModel } from '../../models/service-model';
import { GameService } from '../../services/game-service';
import { BaseRequest } from '../../request/base-request';
import { BasePageComponent } from '../../commons/base-page-component';

@Component({
  selector: 'app-game-list-page',
  standalone: true,
  imports: [CommonModule, SlickCarouselModule],
  templateUrl: './game-list-page.component.html',
  styleUrl: './game-list-page.component.scss'
})
export class GameListPageComponent extends BasePageComponent implements OnInit {

  serviceList: Array<ServiceModel> | undefined;

  constructor(private gameService: GameService, private cdr: ChangeDetectorRef) { 
    super();
  }
  ngOnInit(): void {
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
    ]
  }

  onGetServiceList(){
    this.serviceList = new Array<ServiceModel>();
    let baseRequest: BaseRequest = {
      pageIndex: this.pageIndex, 
      pageSize: this.pageSize
    }
    this.gameService.Get(baseRequest).subscribe({
      next: (result) => {
        if(result){
          if(result.code == 1){
            this.serviceList = result.data; 
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
