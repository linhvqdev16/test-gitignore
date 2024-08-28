import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game-service';
import { ServiceModel } from '../../models/service-model';
import { BaseRequest } from '../../request/base-request';
import { UserService } from '../../services/user-service';
import { ServerModel } from '../../models/server-model';
import { GetServerRequest } from '../../request/get-server-request';
import { error } from 'console';

@Component({
  selector: 'app-register-gamer-page',
  templateUrl: './register-gamer-page.component.html',
  styleUrl: './register-gamer-page.component.scss'
})
export class RegisterGamerPageComponent implements OnInit{

  constructor(private gameService: GameService,
              private userService: UserService, 
              private cdr: ChangeDetectorRef){}

  serviceModels: Array<ServiceModel> | undefined;
  serverModels: Array<ServerModel> | undefined;
  
  serviceSelected: ServiceModel | undefined;
  serverSelected: ServerModel | undefined;

  ngOnInit(): void {
    this.onGetServiceModels();
    this.onGetServerModels(); 
  }

  onGetServiceModels(){
    this.serviceModels = new Array<ServiceModel>(); 
    let baseRequest: BaseRequest = {
      pageIndex: 1, 
      pageSize: 100
    }; 
    this.gameService.Get(baseRequest).subscribe({
      next: (result) => {
        if(result){
          if(result.code == 1){
            this.serviceModels = result.data;
          }
        }
        this.cdr.detectChanges();
      }, 
      error: (error) => {
        console.log(error);
      }
    }) 
  }
  onGetServerModels(){
    this.serverModels = new Array<ServerModel>(); 
    let request : GetServerRequest = {
      serviceId: this.serviceSelected?.serviceId ?? 0
    }
    this.userService.GetServer(request).subscribe({
      next: (result) => {
         if(result){
          if(result.code == 1){
            this.serverModels = result.data;
          }
         }
      }, 
      error: (error) => {
        console.log(error);
      }
    }); 
    this.cdr.detectChanges();
  }

}
