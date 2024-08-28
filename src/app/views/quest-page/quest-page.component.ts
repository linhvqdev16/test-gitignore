import { Component, OnDestroy, OnInit } from '@angular/core';
import { ServiceModel } from '../../models/service-model';
import { MissionModel } from '../../models/mission-model';
import { QuestModel } from '../../models/quest-model';
import { MissionService } from '../../services/mission-service';
import { BasePageComponent } from '../../commons/base-page-component';
import { Subject, takeUntil } from 'rxjs';
import { GetListMissionRequest } from '../../request/get-list-mission-request';
import { error } from 'console';

@Component({
  selector: 'app-quest-page',
  templateUrl: './quest-page.component.html',
  styleUrl: './quest-page.component.scss'
})
export class QuestPageComponent extends BasePageComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject();
  serviceGames: Array<ServiceModel> | undefined;
  serviceModelSelected: any;
  missions: Array<MissionModel> | undefined;
  quests: Array<QuestModel> | undefined;
  totalQuest: number | undefined;
  totalRecord: number | undefined;

  getListMissionRequest: GetListMissionRequest | undefined;

  constructor(private missionService: MissionService) {
    super();
  }

  ngOnInit(): void {
    this.onSetServiceGames();
    this.onGetMissions();
    this.onGetQuests();
    this.onGets();
  }

  ngOnDestroy(): void {

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
    ];
  }


  onGets() {
    if (this.getListMissionRequest == undefined) {
      this.getListMissionRequest = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        serviceId: 0
      }
    }
    this.getListMissionRequest.serviceId = 330413;
    this.missionService.Get(this.getListMissionRequest).subscribe(
      {
        next: (result) => {
        if(result){
          if(result.status){
            console.log('HIHI');
          }
        }
        }, 
        error: (error) => {
          console.log(error);
        }
      }
    )
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
    ];
    this.totalRecord = this.missions.length;
  }

  onGetQuests() {
    this.quests = new Array<QuestModel>();

    for (let i = 0; i < 13; i++) {
      let model: QuestModel =
      {
        id: i,
        name: 'Nhập mã lần đầu',
        eventName: 'Quest ' + i,
        questValue: 100000
      };
      this.quests.push(model);
    }
    this.totalQuest = this.quests.length % 3 == 1 ? Math.floor(this.quests.length / 3) + 1 : this.quests.length / 3;
  }

  onGetQuestTable(index: number): any {
    return this.quests?.slice(index * 3, 3 * (index + 1));
  }
  onGetPagination(): any {
    let arrayTable: Array<number> | undefined;
    arrayTable = new Array<number>();
    let numberPage: number = 0;
    if (this.totalRecord != undefined) {
      numberPage = this.totalRecord / 4 == 1 ? Math.floor(this.totalRecord / 4) + 1 : this.totalRecord / 4;
      for (let i = 1; i < numberPage; i++) {
        arrayTable.push(i);
      }
      return arrayTable;
    }
    return arrayTable;
  }

  counter(): any {
    let arrayTable: Array<number> | undefined;
    arrayTable = new Array<number>();
    if (this.totalQuest != undefined) {
      let total: number = this.totalQuest;
      for (let i = 0; i < total; i++) {
        arrayTable.push(i);
      }
      return arrayTable;
    }
    return arrayTable;
  }

  changeSelectService() {
    console.log('change selected value');
  }

  onChangePage() {

  }
}
