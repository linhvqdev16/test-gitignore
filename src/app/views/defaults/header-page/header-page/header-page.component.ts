import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UrlDefine } from '../../../../commons/url-define';
import { Common } from '../../../../commons/common';
import { BasePageComponent } from '../../../../commons/base-page-component';
import { LocalStorageSerice } from '../../../../core/local-storage/local-storeage-service';
import { UserModel } from '../../../../models/user-model';

@Component({
  selector: 'app-header-page',
  templateUrl: './header-page.component.html',
  styleUrls: [
    './header-page.component.scss',
  ],
})
export class HeaderPageComponent extends BasePageComponent implements OnInit {

  private returlUrl: string | undefined;


  constructor(private router: Router, activatedRoute: ActivatedRoute, localStorageService: LocalStorageSerice, private cdr: ChangeDetectorRef) 
  {
    super();
  }

  isLoggin: boolean = false; 
  userModel: UserModel | undefined; 

  override ngOnInit(): void {
    if(this.localStorageService.getToken() && this.localStorageService.getToken().length > 0){
      this.isLoggin = true;
      this.userModel = this.localStorageService.getUserInfo();
      this.cdr.detectChanges();
    }
  }
  ngQuest(): void {
    this.router?.navigateByUrl(UrlDefine.QuestPage);
  }
  ngHome(): void {
    this.router.navigateByUrl(UrlDefine.HomePage);
  }
  onNavRegister(): void {
    this.router.navigateByUrl(UrlDefine.RegisterGamerPage);
  }
  onNavListGame(): void {
    this.router.navigateByUrl(UrlDefine.GameListPage);
  }
  onNavPersonalPage(): void {
    this.router.navigateByUrl(UrlDefine.PersonalPage);
  }
  onLogin() {
    let loginUrl: string = "";
    loginUrl = Common.GetAuthorUrl();
    loginUrl = loginUrl.replace('clientValue', Common.GetClienId());
    let originUrl: string = encodeURI(window.location.href);
    loginUrl = loginUrl.replace('redirecUrl', originUrl);
    loginUrl = loginUrl.replace('agencyValue', '0');
    window.open(loginUrl);
  }
  onLogout(){
    this.isLoggin = false;
    this.localStorageService.clean();
    this.cdr.detectChanges();
  }
}
