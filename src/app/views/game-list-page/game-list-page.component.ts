import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { SlickCarouselComponent, SlickCarouselModule } from 'ngx-slick-carousel';
import { ServiceModel } from '../../models/service-model';

@Component({
  selector: 'app-game-list-page',
  standalone: true,
  imports: [CommonModule, SlickCarouselModule],
  templateUrl: './game-list-page.component.html',
  styleUrl: './game-list-page.component.scss'
})
export class GameListPageComponent implements OnInit {

  serviceList: Array<ServiceModel> | undefined;

  constructor(){}

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
    // "customPaging": function(i: number){
    //   return '<a>' + (i + 1) + '</a>';
    // },
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
    for(let i = 0; i < 4; i++){
      let model: ServiceModel = {
        isAndroid: true, 
        isIos: true, 
        isPc: true, 
        serviceId: i + 1, 
        serviceName: 'Giang Hồ Ngũ Tuyệt', 
        serviceImage: 'images/icon-ghnt.png', 
        serviceThumb: 'images/thumb-ghnt.png'
      }; 
      this.serviceList.push(model);
    }
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
