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
import { CommunicateService } from '../../services/base-services/communicate-service';
import { LocalStorageSerice } from '../../core/local-storage/local-storeage-service';

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
    private communicateService: CommunicateService) {
    super();
    if(this.localStorageService.getToken() == undefined){
      this.userModel = undefined;
    }
  }

  override ngOnInit(): void {
    this.onGetServices();
    this.onGetServer();
  }

  serviceModels: Array<ServiceModel> | undefined;
  serviceSelected: ServiceModel | undefined;
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
    this.serviceModels = new Array<ServiceModel>();
    var request: BaseRequest = {
      pageIndex: 1,
      pageSize: 20
    };
    this.gameService.Get(request).subscribe({
      next: (res) => {
        if (res && res.code == 1) {
          this.serviceModels = res.data;
          this.cdr.detectChanges();
        }
      },
      error: (error) => {
        // console.log(error);
        this.cdr.detectChanges();
      }
    });
  }

  onGetInfoInfluencer() {
    console.log('call get info by scoinId');
    let request: GetInfluencerByScoinIdRequest = {
      serviceId: 0
    };
    this.influencerService.GetByScoinId(request).subscribe({
      next: (res) => {
        if (res) {
          if (res.status) {
            this.influencerModel = res.data[0];
            this.cdr.detectChanges();
          }
        }
      },
      error: (error) => {
        // console.log(error);
        this.cdr.detectChanges();
      }
    });
  }
  onGetServer() {
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
        this.cdr.detectChanges();
      },
      error: (error) => {
        // console.log(error);
        this.cdr.detectChanges();
      }
    });
    this.firstSeverModel = this.serverModels[0];
  }
  onChangeServiceSelected(event: any) {

    if (event && event.target && event.target.value) {
      this.onGetInfoService(event.target.value);
    }
  }
  onGetInfoService(serviceId: number) {

    this.serviceGetInfoModel = this.serviceModels?.find(item => item.serviceId == serviceId);
    this.cdr.detectChanges();
  }
  onCopyLinkPathClipboar() {

  }
  onCopyLinkPathReferenName() {

  }

  onNavToRegisterPage(): void {
    this.communicateService.setAction(1);
    this.router.navigateByUrl(UrlDefine.RegisterGamerPage);
  }

}
