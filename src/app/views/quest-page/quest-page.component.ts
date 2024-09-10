import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { ServiceModel } from '../../models/service-model';
import { MissionModel } from '../../models/mission-model';
import { QuestModel } from '../../models/quest-model';
import { MissionService } from '../../services/mission-service';
import { BasePageComponent } from '../../commons/base-page-component';
import { Subject, takeUntil } from 'rxjs';
import { GetListMissionRequest } from '../../request/get-list-mission-request';
import { GameService } from '../../services/game-service';
import { BaseRequest } from '../../request/base-request';
import { QuestService } from '../../services/quest-service';
import { GetQuestByMissionRequest } from '../../request/get-quest-by-mission-request';
import { BaseModelResponse } from '../../response/base-response';

@Component({
  selector: 'app-quest-page',
  templateUrl: './quest-page.component.html',
  styleUrl: './quest-page.component.scss'
})
export class QuestPageComponent extends BasePageComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject();
  serviceGames: Array<ServiceModel> | undefined;
  serviceModelSelected: any;
  missions: Array<MissionModel> | undefined;
  quests: Array<QuestModel> | undefined;
  totalQuest: number | undefined;
  totalRecord: number | undefined;
  getListMissionRequest: GetListMissionRequest | undefined;
  serviceSelected?: number;
  arrayTable: Array<number> | undefined;

  constructor(private missionService: MissionService,
    private gameService: GameService,
    private questService: QuestService,
    private cdr: ChangeDetectorRef) {
    super();
  }
  override ngOnInit(): void {
    this.onGetServices();
    this.onGetMissions();
    this.onGetQuests();
  }
  onGetServices() {
    // this.isSetLoading();
    let initialService: ServiceModel = {
      id: 0,
      serviceId: 0,
      serviceName: 'Tất cả gane'
    };
    this.serviceGames = new Array<ServiceModel>();
    let baseRequest: BaseRequest = {
      pageIndex: 1,
      pageSize: 20
    };
    this.gameService.Get(baseRequest).subscribe(
      {
        next: (result) => {
          if (result) {
            if (result.code === 1) {
              this.serviceGames = result.data;
              this.serviceGames?.splice(0, 0, initialService);
            }
            // this.unSetLoading();
            this.cdr.detectChanges();
          }
        },
        error: (error) => {
          console.log(error);
          // this.unSetLoading();
          this.cdr.detectChanges();
        }
      }
    )
  }
  onGetMissions() {
    // this.isSetLoading();
    if (this.getListMissionRequest == undefined) {
      this.getListMissionRequest = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      }
    }
    if (this.serviceModelSelected != undefined) {
      this.getListMissionRequest.serviceId = this.serviceModelSelected.serviceId;
    }
    this.missionService.Get(this.getListMissionRequest).subscribe(
      {
        next: (result) => {
          if (result) {
            if (result.status) {
              let data: BaseModelResponse = result.data;
              this.missions = data.data;
              this.totalRecord = data.totalRecord;
            }
            // this.unSetLoading();
            this.cdr.detectChanges();
          }
        },
        error: (error) => {
          console.log(error);
          // this.unSetLoading();
          this.cdr.detectChanges();
        }
      }
    )
  }
  getQuestByMissionRequest: GetQuestByMissionRequest | undefined;
  onGetQuests() {
    // this.isSetLoading();
    this.quests = new Array<QuestModel>();
    if (this.getQuestByMissionRequest == undefined) {
      this.getQuestByMissionRequest = {
        missionId: 0
      };
    }
    this.questService.GetQuestByMissionId(this.getQuestByMissionRequest).subscribe(
      {
        next: (result) => {
          if (result) {
            if (result.status) {
              let data: BaseModelResponse = result.data;
              this.quests = data.data;
              this.getNumberTable((data.totalRecord ?? 0) % 3 == 1 ? Math.floor((data.totalRecord ?? 0) / 3) + 1 : (data.totalRecord ?? 0) / 3);
            }
            // this.unSetLoading();
            this.cdr.detectChanges();
          }
        },
        error: (error) => {
          // this.unSetLoading();
          this.cdr.detectChanges();
          console.log(error);
        }
      }
    );
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
  getNumberTable(val: number): void {
    this.arrayTable = new Array<number>();
    for (let i = 0; i < val; i++) {
      this.arrayTable.push(i);
    }
  }
  changeSelectService() {
    this.pageIndex = 1;
    this.onGetMissions();
  }
  onChangePage() { }
}
