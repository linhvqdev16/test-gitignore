import { Component } from '@angular/core';
import { Common } from '../../../commons/common';
import { UrlDefine } from '../../../commons/url-define';

@Component({
  selector: 'app-dialog-error',
  templateUrl: './dialog-error.component.html',
  styleUrl: './dialog-error.component.scss'
})
export class DialogErrorComponent {
  onLogin() {
    let loginUrl: string = "";
    loginUrl = Common.GetAuthorUrl();
    loginUrl = loginUrl.replace('clientValue', Common.GetClienId());
    var url = window.location.href.split("?");
    let originUrl: string = encodeURI(url[0]).replaceAll(UrlDefine.RegisterGamerPage, UrlDefine.HomePage);
    loginUrl = loginUrl.replace('redirecUrl', originUrl);
    loginUrl = loginUrl.replace('agencyValue', '0');
    window.open(loginUrl);
  }
}
