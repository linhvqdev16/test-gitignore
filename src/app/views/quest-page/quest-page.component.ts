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
import { BaseModelResponse } from '../../response/base-response';
import { Router } from '@angular/router';
import { UrlDefine } from '../../commons/url-define';
import { RegisterMissionRequest } from '../../request/register-mission-request';

@Component({
  selector: 'app-quest-page',
  templateUrl: './quest-page.component.html',
  styleUrl: './quest-page.component.scss'
})
export class QuestPageComponent extends BasePageComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject();
  serviceGames: Array<ServiceModel> | undefined;
  serviceIdSelected: number | undefined;
  missions: Array<MissionModel> | undefined;
  quests: Array<QuestModel> | undefined;
  totalQuest: number | undefined;
  totalRecord: number | undefined;
  getListMissionRequest: GetListMissionRequest | undefined;
  serviceSelected?: number;
  arrayTable: Array<number> | undefined;

  constructor(private missionService: MissionService,
    private gameService: GameService,
    private cdr: ChangeDetectorRef,
    private route: Router) {
    super();
  }
  override ngOnInit(): void {
    this.onGetServices();
    this.onGetMissions();
  }
  onGetServices() {
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
            }
            this.cdr.detectChanges();
          }
        },
        error: (error) => {
          this.openSnackBar(error.message, '');
          this.cdr.detectChanges();
        }
      }
    )
  }

  onGetMissions() {
    if (this.getListMissionRequest == undefined) {
      this.getListMissionRequest = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      }
    }
    if (this.serviceIdSelected != undefined) {
      this.getListMissionRequest.serviceId = this.serviceIdSelected;
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
            this.cdr.detectChanges();
          }
        },
        error: (error) => {
          this.openSnackBar(error.message, '');
          this.cdr.detectChanges();
        }
      }
    )
  }

  onRegisterMission(missionId: number) {
    let request: RegisterMissionRequest = {
      missionId: missionId
    };
    this.missionService.RegisterMission(request).subscribe({
      next: (result) => {
        if(result){
          if(result.status){
            this.openSnackBar(result.message ?? "", '');
            this.onGetMissions();
            this.cdr.detectChanges();
          }
        }
      }, 
      error: (error) => {
        this.openSnackBar(error.message, '');
        this.cdr.detectChanges();
      }
    })
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

  changeSelectService(event: any) {
    this.pageIndex = 1;
    this.serviceIdSelected = event.target.value;
    this.onGetMissions();
  }
  onChangePage() { }

  onNavigateDetail(id: number) {
    this.route.navigate([UrlDefine.QuestDetailPage, id]);
  }
}
