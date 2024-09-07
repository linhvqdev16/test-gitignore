import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game-service';
import { ServiceModel } from '../../models/service-model';
import { BaseRequest } from '../../request/base-request';
import { UserService } from '../../services/user-service';
import { ServerModel } from '../../models/server-model';
import { GetServerRequest } from '../../request/get-server-request';
import { BasePageComponent } from '../../commons/base-page-component';
import { RoleModel } from '../../models/role-model';

@Component({
  selector: 'app-register-gamer-page',
  templateUrl: './register-gamer-page.component.html',
  styleUrl: './register-gamer-page.component.scss'
})
export class RegisterGamerPageComponent extends BasePageComponent implements OnInit {

  constructor(private gameService: GameService,
    userService: UserService,
    private cdr: ChangeDetectorRef) {
    super();
  }

  serviceModels: Array<ServiceModel> | undefined;
  serverModels: Array<ServerModel> | undefined;
  roleModels: Array<RoleModel> | undefined;

  serviceSelected?: number;
  serverSelected?: number;
  roleSelected?: number;
  roleIntitial: RoleModel = {
    roleId: '0',
    roleName: 'Chọn nhân vât'
  }
  override ngOnInit(): void {
    this.onGetServiceModels();
    this.onGetServerModels();
  }

  onGetServiceModels() {
    this.isSetLoading();
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
        this.unSetLoading();
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.log(error);
        this.unSetLoading();
        this.cdr.detectChanges();
      }
    });
  }

  onGetServerModels() {
    this.isSetLoading();
    this.serverModels = new Array<ServerModel>();
    let request: GetServerRequest = {
      serviceId: this.serviceSelected ?? 0
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
              this.unSetLoading();
              this.cdr.detectChanges();
            }
          }
        }
      },
      error: (error) => {
        console.log(error);
        this.unSetLoading();
        this.cdr.detectChanges();
      }
    });
  }

  onChangeServerModel(event: any) {
    if (event?.target.value) {
      this.serverSelected = event?.target.value;
      if (this.serverModels && this.serverModels.length > 0) {
        this.roleModels = new Array<RoleModel>();
        var item = this.serverModels.find((item) => item.serverId == this.serverSelected);
        if (item && item.roles && item.roles.length > 0) {
          this.roleModels = item.roles;
          this.roleModels.splice(0, 0, this.roleIntitial);
        }
        this.cdr.detectChanges();
      }
    }
  }
  onChangeServiceModel(event: any) {
    if (event.target.value) {
      this.serviceSelected = event.target.value;
      this.onGetServerModels();
    }
  }
}
