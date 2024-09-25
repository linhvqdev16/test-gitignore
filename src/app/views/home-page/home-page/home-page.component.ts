import { Component,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UrlDefine } from '../../../commons/url-define';
import { CommunicateService } from '../../../services/base-services/communicate-service';
import { MatDialog } from '@angular/material/dialog';
import { DialogErrorComponent } from '../../defaults/dialog-error/dialog-error.component';
import { LocalStorageSerice } from '../../../core/local-storage/local-storeage-service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {

  constructor(private router: Router, private communicationService: CommunicateService, private dialog: MatDialog, private localStorageService: LocalStorageSerice) {
  }

   ngOnInit(): void {
    this.communicationService.currentAuthen.subscribe((res) => {
      this.dialog.closeAll();
      if (res == 1) {
        this.communicationService.setAuthen(0);
        if (this.localStorageService.getToken().length == 0) {
          this.dialog.open(DialogErrorComponent);
        }
      }
    });
  }

  onNavRegister(): void {
    this.communicationService.setAction(0);
    this.router.navigateByUrl(UrlDefine.RegisterGamerPage);
  }
  onNavListGame(): void {
    this.router.navigateByUrl(UrlDefine.GameListPage);
  }
  onNavListQuest(): void {
    this.router.navigateByUrl(UrlDefine.QuestPage);
  }
  onNavProfilePage(): void {
    this.router.navigateByUrl(UrlDefine.PersonalPage);
  }
}
