import { Component, OnInit } from '@angular/core';
import { ServiceModel } from '../../models/service-model';
import { MissionModel } from '../../models/mission-model';

@Component({
  selector: 'app-quest-page',
  templateUrl: './quest-page.component.html',
  styleUrl: './quest-page.component.scss'
})
export class QuestPageComponent implements OnInit {

  serviceGames: Array<ServiceModel> | undefined;
  serviceModelSelected: any;
  missions: Array<MissionModel> | undefined;
  constructor() { }

  ngOnInit(): void {
    console.log('Quest Page Component');
    this.onSetServiceGames();
    this.onGetMissions();
  }


  onSetServiceGames() {
    this.serviceGames = new Array<ServiceModel>();
    this.serviceGames = [
      {
        serviceId: 1,
        serviceName: "Tất cả game"
      },
      {
        serviceId: 2,
        serviceName: "Giang Hồ Ngũ Tuyệt"
      },
      {
        serviceId: 3,
        serviceName: "Giang Hồ Bát Phát"
      },
      {
        serviceId: 4,
        serviceName: "Đạo Sĩ Xuất Quan"
      }
    ]
  }


  onGetMissions() {
    this.missions = new Array<MissionModel>();
    this.missions = [
      {
        id: 1,
        name: 'Giang Hồ Ngũ Tuyệt',
        endDate: new Date(),
        earnPoint: 10000,
        bannerUrl: "images/thumb-ghnt.png"
      },
      {
        id: 2,
        name: 'Ta Là Chiến Thần',
        endDate: new Date(),
        earnPoint: 10000,
        bannerUrl: "images/thumb-ghnt.png"
      },
      {
        id: 3,
        name: 'Thiên Long Quyết',
        endDate: new Date(),
        earnPoint: 10000,
        bannerUrl: "images/thumb-ghnt.png"
      },
      {
        id: 1,
        name: 'Giang Hồ Ngũ Tuyệt',
        endDate: new Date(),
        earnPoint: 10000,
        bannerUrl: "images/thumb-ghnt.png"
      }
    ]
  }

  changeSelectService() {
    console.log('change selected value');
  }

}
