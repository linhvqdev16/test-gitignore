import { ChangeDetectorRef, Component, input, OnInit } from '@angular/core';
import { BasePageComponent } from '../../commons/base-page-component';
import { MissionService } from '../../services/mission-service';
import { GetMissionDetailRequest } from '../../request/get-mission-detail-request';
import { QuestService } from '../../services/quest-service';
import { MissionModel } from '../../models/mission-model';
import { BaseModelResponse } from '../../response/base-response';
import { QuestModel } from '../../models/quest-model';
import { GetQuestByMissionRequest } from '../../request/get-quest-by-mission-request';

@Component({
  selector: 'app-quest-detail-page',
  templateUrl: './quest-detail-page.component.html',
  styleUrl: './quest-detail-page.component.scss'
})
export class QuestDetailPageComponent extends BasePageComponent implements OnInit {

  constructor(private missionService: MissionService, private questService: QuestService, private cdr: ChangeDetectorRef) {
    super();
  }

  missionId: number = 0;
  missionModel: MissionModel | undefined;
  quests: Array<QuestModel> | undefined;
  arrayTable: Array<number> | undefined;
  totalQuest: number = 0;
  totalRecord: number | undefined;

  override ngOnInit(): void {
    var arrayParams = window.location.href.split("/");
    this.missionId = +arrayParams[arrayParams.length - 1];
    this.onGetDetailMisison();
  }

  onGetDetailMisison() {
    let request: GetMissionDetailRequest = {
      id: this.missionId
    };
    this.missionService.GetMissionDetail(request).subscribe({
      next: (result) => {
        if (result) {
          if (result.status) {
            this.missionModel = result.data;
            this.onGetQuests();
          }
        }
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.openSnackBar(error.message, '');
      }
    })
  }

  onGetQuests() {
    let request: GetQuestByMissionRequest = { missionId: this.missionId };
    this.questService.GetQuestByMissionId(request).subscribe(
      {
        next: (result) => {
          if (result) {
            debugger;
            if (result.status) {
              debugger;
              let data: BaseModelResponse = result.data;
              this.quests = data.data;
              this.totalQuest = data.totalRecord ?? 0;
              this.onGetPagination();
            }
            this.cdr.detectChanges();
          }
        },
        error: (error) => {
          this.openSnackBar(error.message, '');
          this.cdr.detectChanges();
        }
      }
    );
  }

  onGetPagination(): void {
    this.arrayTable = new Array<number>();
    let numberPage: number = 0;
    if (this.totalQuest != undefined) {
      numberPage = this.totalQuest % 4 != 0 ? Math.floor(this.totalQuest / 4) + 1 : this.totalQuest % 4;
      for (let i = 0; i < numberPage; i++) {
        this.arrayTable.push(i);
      }
    }
  }

  onGetQuestTable(index: number): any {
    return this.quests?.slice(index * 3, 3 * (index + 1));
  }
}
