import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UrlDefine } from '../../commons/url-define';
import { GameService } from '../../services/game-service';
import { BasePageComponent } from '../../commons/base-page-component';
import { ServiceModel } from '../../models/service-model';
import { BaseRequest } from '../../request/base-request';
import { GetInfluencerByScoinIdRequest } from '../../request/influencer/get-influencer-by-scoin-id-request';
import { InfluencerService } from '../../services/influencer-service';
import { InfluencerModel } from '../../models/influencer-model';
import { UserService } from '../../services/user-service';
import { ServerModel } from '../../models/server-model';
import { GetServerRequest } from '../../request/get-server-request';
import { GetInfoServiceRequest } from '../../request/get-info-service-request';

@Component({
  selector: 'app-personal-page',
  templateUrl: './personal-page.component.html',
  styleUrl: './personal-page.component.scss'
})
export class PersonalPageComponent extends BasePageComponent implements OnInit {

  constructor(private router: Router,
    private gameService: GameService,
    private cdr: ChangeDetectorRef,
    private influencerService: InfluencerService,
    userService: UserService) {
    super();
  }

  override ngOnInit(): void {
    this.onGetServices();
    this.onGetInfoInfluencer();
    this.onGetServer();
  }

  serviceModels: Array<ServiceModel> | undefined;
  serviceSelected: ServiceModel = {
    id: 0,
    serviceName: 'Chọn game'
  };
  influencerModel: InfluencerModel | undefined;
  serverModels: Array<ServerModel> | undefined;
  firstSeverModel: ServerModel | undefined;
  serviceGetInfoModel: ServiceModel | undefined;

  onNavPersonalPage() {
    this.router.navigateByUrl(UrlDefine.PersonalPage);
  }
  onNaReportCommonPage() {
    this.router.navigateByUrl(UrlDefine.ReportCommonPage);
  }

  onGetServices() {
    // this.isSetLoading();
    this.serviceModels = new Array<ServiceModel>();
    var request: BaseRequest = {
      pageIndex: 1,
      pageSize: 20
    };
    this.gameService.Get(request).subscribe({
      next: (res) => {
        if (res && res.code == 1) {
          this.serviceModels = res.data;
          this.serviceModels?.splice(0, 0, this.serviceSelected)
          // this.unSetLoading();
          this.cdr.detectChanges();
        }
      },
      error: (error) => {
        console.log(error);
        // this.unSetLoading();
        this.cdr.detectChanges();
      }
    });
  }

  onGetInfoInfluencer() {
    // this.isSetLoading();
    let request: GetInfluencerByScoinIdRequest = {
      serviceId: 0
    };
    this.influencerService.GetByScoinId(request).subscribe({
      next: (res) => {
        if (res) {
          if (res.status) {
            this.influencerModel = res.data[0];
            // this.unSetLoading();
            this.cdr.detectChanges();
          }
        }
      },
      error: (error) => {
        console.log(error);
        // this.unSetLoading();
        this.cdr.detectChanges();
      }
    });
  }
  onGetServer() {
    // this.isSetLoading();
    this.serverModels = new Array<ServerModel>();
    let request: GetServerRequest = {
      serviceId: this.serviceSelected?.serviceId ?? 0
    }
    this.userService.GetServer(request).subscribe({
      next: (result) => {
        if (result) {
          if (result.code == 1) {
            this.serverModels = result.data;
          }
        }

        // this.unSetLoading();
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.log(error);
        // this.unSetLoading();
        this.cdr.detectChanges();
      }
    });
    this.firstSeverModel = this.serverModels[0];
  }
  onChangeServiceSelected(event: any) {
    debugger;
    if (event && event.target && event.target.value) {
      this.onGetInfoService(event.target.value);
    }
  }
  onGetInfoService(serviceId: number) {
    debugger;
    this.serviceGetInfoModel = this.serviceModels?.find(item => item.serviceId == serviceId);
    this.cdr.detectChanges();
  }
  onCopyLinkPathClipboar() {

  }

  onCopyLinkPathReferenName() {

  }

}
