import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game-service';
import { ServiceModel } from '../../models/service-model';
import { BaseRequest } from '../../request/base-request';
import { UserService } from '../../services/user-service';
import { ServerModel } from '../../models/server-model';
import { GetServerRequest } from '../../request/get-server-request';
import { BasePageComponent } from '../../commons/base-page-component';
import { RoleModel } from '../../models/role-model';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GetInfluencerByCodeRequest } from '../../request/get-influencer-by-code-request';
import { InfluencerService } from '../../services/influencer-service';
import { RegisterInfluencerRequest } from '../../request/influencer/register-influencer-request';
import { Location } from '@angular/common';
import { CommunicateService } from '../../services/base-services/communicate-service';
import { Subscription } from 'rxjs';
import { GetInfluencerByScoinIdRequest } from '../../request/influencer/get-influencer-by-scoin-id-request';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../defaults/dialog/dialog.component';
@Component({
  selector: 'app-register-gamer-page',
  templateUrl: './register-gamer-page.component.html',
  styleUrl: './register-gamer-page.component.scss',
})
export class RegisterGamerPageComponent extends BasePageComponent implements OnInit {

  subscription: Subscription | undefined;

  constructor(private gameService: GameService,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private influnencerService: InfluencerService,
    private location: Location,
    private dialog: MatDialog) {
    super();
    this.action = this.communicateService.getAction();
    if (this.action == 1) {
      this.isReadonly = true;
    }
    console.log(this.action);
    this.createFormBuild();

  }

  action;
  isReadonly: boolean = false;
  serviceModels: Array<ServiceModel> | undefined;
  serverModels: Array<ServerModel> | undefined;
  roleModels: Array<RoleModel> | undefined;

  roleSelected?: number | 0;
  registerInfluencerRequest: RegisterInfluencerRequest = {
    serverId: 0,
    serviceId: 0,
    roleId: 0,
    slogan: '',
    referenceName: '',
    nickName: '',
    roleName: ''
  }; 
  serviceId?: number = 0; 
  serverId?: number = 0; 
  roleId?: number = 0;

  form: FormGroup = new FormGroup({
    nickname: new FormControl(),
    referenceName: new FormControl(),
    slogan: new FormControl(),
    acceptTerms: new FormControl(),
    acceptAge: new FormControl()
  });

  submitted = false;
  isExisInfluencerCode = false;

  override ngOnInit(): void {
    this.onGetServiceModels();
    this.onGetServerModels(null);
    if (this.action == 1) {
      let request: GetInfluencerByScoinIdRequest = {
        serviceId: 0
      }
      this.influnencerService.GetByScoinId(request).subscribe({
        next: (result) => {
          if (result.status) {
            this.registerInfluencerRequest.serviceId = result.data[0].serviceId;
            this.registerInfluencerRequest.serverId = result.data[0].serverId;
            this.registerInfluencerRequest.nickName = result.data[0].nickName;
            this.registerInfluencerRequest.slogan = result.data[0].slogan;
            this.registerInfluencerRequest.referenceName = result.data[0].referenceName;
            this.cdr.detectChanges();
          }
        },
        error: (error) => {
          this.openSnackBar(error.message, '');
        }
      });
    }
  }
  createFormBuild(): void {
    this.form = this.formBuilder.group(
      {
        serviceId: [null, Validators.required], 
        serverId: [null, Validators.required], 
        roleId: [null, Validators.required],
        nickname: ['', Validators.required],
        referenceName: [
          '',
          [
            Validators.required,
            Validators.pattern('^[A-Z|\\d]*')
          ],
        ],
        slogan: [
          '',
          [
            Validators.required,
            Validators.maxLength(60),
          ],
        ],
        acceptTerms: [false, Validators.requiredTrue],
        acceptAge: [false, Validators.requiredTrue],
      }
    );
  }

  onGetServiceModels() {
    this.serviceModels = new Array<ServiceModel>();
    let baseRequest: BaseRequest = {
      pageIndex: 1,
      pageSize: 100
    };
    this.gameService.Get(baseRequest).subscribe({
      next: (result) => {
        if (result) {
          if (result.code == 1) {
            this.serviceModels = result.data;
          }
        }
        this.cdr.detectChanges();
      },
      error: (error) => {
        // console.log(error);
        this.openSnackBar(error.message, '');
        this.cdr.detectChanges();
      }
    });
  }

  onGetServerModels(serviceId: any) {
    this.serverModels = new Array<ServerModel>();
    let request: GetServerRequest = {
      serviceId: serviceId
    }
    this.userService.GetServer(request).subscribe({
      next: (result) => {
        if (result) {
          if (result.code == 1) {
            this.serverModels = result.data;
            if (this.serverModels) {
              this.roleModels = new Array<RoleModel>();
              for (let item of this.serverModels) {
                if (item.roles && item.roles.length > 0) {
                  this.roleModels = this.roleModels?.concat(item.roles);
                }
              }
            }
            this.cdr.detectChanges();
          }
        }
      },
      error: (error) => {
        // console.log(error);
        this.openSnackBar(error.message, '');
        this.cdr.detectChanges();
      }
    });
  }
  onGetInfluencerByCode(event: any) {
    if (event && event.target && event.target.value) {
      this.isExisInfluencerCode = false;
      let request: GetInfluencerByCodeRequest = {
        referenceName: event.target.value
      };
      this.influnencerService.GetByCode(request).subscribe({
        next: (result) => {
          if (result) {
            if (result.status && result.data) {
              this.isExisInfluencerCode = true;
            }
            this.cdr.detectChanges();
          }
        },
        error: (error) => {
          // console.log(error);
          this.openSnackBar(error.message, '');
          this.cdr.detectChanges();
        }
      });
    }
  }

  onChangeServerModel(event: any) {
    if (event?.target.value) {
      this.registerInfluencerRequest.serverId = event.target.value;
      if (this.serverModels && this.serverModels.length > 0) {
        this.roleModels = new Array<RoleModel>();
        var item = this.serverModels.find((item) => item.serverId == event?.target.value);
        if (item && item.roles && item.roles.length > 0) {
          this.roleModels = item.roles;
        }
        this.cdr.detectChanges();
      }
    }
  }
  onChangeServiceModel(event: any) {
    if (event.target.value) {
      this.registerInfluencerRequest.serviceId = event.target.value;
      this.onGetServerModels(event.target.value);
    }
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.registerInfluencerRequest.twitchChanel = '';
    this.registerInfluencerRequest.livegChanel = '';
    this.registerInfluencerRequest.roleName = '';
    this.registerInfluencerRequest.nickName = this.form.value['nickname'];
    this.registerInfluencerRequest.slogan = this.form.value['slogan'];
    this.registerInfluencerRequest.referenceName = this.form.value['referenceName'];
    this.influnencerService.Register(this.registerInfluencerRequest).subscribe({
      next: (result) => {
        if (result) {
          if (result.status) {
            this.submitted = false;
            this.form.reset();
            const dialogRef = this.dialog.open(DialogComponent);
          } else {
            this.openSnackBar(result.message ?? '', '');
          }
          this.cdr.detectChanges();
        }
      },
      error: (error) => {
        // console.log(error);
        this.openSnackBar(error.message ?? '', '');
        this.cdr.detectChanges();
      }
    });
  }
  onReset(): void {
    this.submitted = false;
    this.form.reset();
    this.location.back();
  }
}
