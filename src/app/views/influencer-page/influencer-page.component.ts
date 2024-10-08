import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game-service';
import { BasePageComponent } from '../../commons/base-page-component';
import { BaseRequest } from '../../request/base-request';
import { ServiceModel } from '../../models/service-model';
import { InfluencerModel } from '../../models/influencer-model';
import { GetInfluencerByServiceIdRequest } from '../../request/influencer/get-influencer-by-game-id';
import { InfluencerService } from '../../services/influencer-service';
import { CommunicateService } from '../../services/base-services/communicate-service';
import { BaseModelResponse } from '../../response/base-response';
import { AddOrChangeSupportRequest } from '../../models/add-or-change-support-request';
import { SupportService } from '../../services/support-service';
import { UnSupportRequest } from '../../request/support/un-support-request';

@Component({
  selector: 'app-influencer-page',
  templateUrl: './influencer-page.component.html',
  styleUrl: './influencer-page.component.scss'
})
export class InfluencerPageComponent extends BasePageComponent implements OnInit {

  constructor(private service: GameService,
    private cdr: ChangeDetectorRef,
    private influencerService: InfluencerService,
    private supportService: SupportService) {
    super();
    this.communicateService.serviceId.subscribe((res) => this.serviceSelectedId = res);
    console.log(this.serviceSelectedId);
  }


  serviceGames: Array<ServiceModel> | undefined;
  influencerModels: Array<InfluencerModel> | undefined;
  influencerModelSelected: InfluencerModel | undefined;
  serviceSelectedId: number = 0;
  keySearch: string = "";
  serverSeletedId: number = 0;
  influencerGetByRequest: GetInfluencerByServiceIdRequest = {
    pageIndex: 1,
    pageSize: 10,
    serverId: 0,
    serviceId: 0,
    referenceCode: ""
  }
  referenceCode: string = "";

  override ngOnInit(): void {
    this.onGetServices();
    this.onGetInfluencer();
  }

  onGetServices() {
    this.serviceGames = new Array<ServiceModel>();
    let baseRequest: BaseRequest = {
      pageIndex: 1,
      pageSize: 20
    };
    this.service.Get(baseRequest).subscribe(
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
          // console.log(error);
          this.openSnackBar(error.message, '');
          this.cdr.detectChanges();
        }
      }
    )
  }
  onGetInfluencer() {
    this.influencerModels = new Array<InfluencerModel>();
    this.influencerGetByRequest.serverId = this.serverSeletedId;
    this.influencerGetByRequest.serviceId = this.serviceSelectedId;
    this.influencerGetByRequest.referenceCode = this.referenceCode;
    this.influencerService.GetByServiceId(this.influencerGetByRequest).subscribe({
      next: (result) => {
        if (result) {
          if (result.status) {
            let model: BaseModelResponse = result.data;
            this.influencerModels = model.data;
            if (this.influencerModels) {
              this.influencerModelSelected = this.influencerModels[0];
            }
          }
          else {
            this.openSnackBar(result.message ?? '', '');
          }
          this.cdr.detectChanges();
        }
      },
      error: (error) => {
        this.openSnackBar(error.message, '');
        this.cdr.detectChanges();
      }
    });
  }
  onSetInfluencer(model: InfluencerModel): void {
    this.influencerModelSelected = model;
    this.cdr.detectChanges();
  }
  onSubmitSupport(): void {
    let request: AddOrChangeSupportRequest = {
      code: this.influencerModelSelected?.referenceName ?? ''
    };
    this.influencerService.SubmitSupport(request).subscribe({
      next: (result) => {
        if (result) {
          this.onGetInfluencer();
          if (this.influencerModels && this.influencerModels?.length > 0) {
            this.influencerModelSelected = this.influencerModels.filter((item) => item.referenceName == request.code)[0];
          }
          this.openSnackBar(result.message ?? "", '');
        }
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.openSnackBar(error.message ?? "", '');
        this.cdr.detectChanges();
      }
    })
  }
  onUnSupport(): void {
    let request: UnSupportRequest = {
      code: this.influencerModelSelected?.referenceName ?? '',
      serviceId: this.influencerModelSelected?.serviceId
    };
    this.supportService.UnSupport(request).subscribe({
      next: (result) => {
        if (result) {
          this.onGetInfluencer();
          if (this.influencerModels && this.influencerModels?.length > 0) {
            this.influencerModelSelected = this.influencerModels.filter((item) => item.referenceName == request.code)[0];
          }
          this.openSnackBar(result.message ?? "", '');
        }
      },
      error: (error) => {
        this.openSnackBar(error.message ?? '', '');
        this.cdr.detectChanges();
      }
    })
  }
  onGetBackGroundColor(model: InfluencerModel): string {
    if (model.id == this.influencerModelSelected?.id) {
      return 'gainsboro';
    }
    return 'white';
  }
  onChangeService(event: any) {
    if (event.target.value) {
      this.serviceSelectedId = event.target.value;
      this.onGetInfluencer();
    }
  }
  onChangeReferenceCode() {
    if (this.referenceCode || this.referenceCode.length == 0) {
      this.onGetInfluencer();
    }
  }
}
