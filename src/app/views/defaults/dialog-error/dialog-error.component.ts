import { Component } from '@angular/core';
import { Common } from '../../../commons/common';
import { UrlDefine } from '../../../commons/url-define';
import { Dialog, DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-dialog-error',
  templateUrl: './dialog-error.component.html',
  styleUrl: './dialog-error.component.scss'
})
export class DialogErrorComponent {

  constructor(private dialog: DialogRef){}

  onLogin() {
    let loginUrl: string = "";
    loginUrl = Common.GetAuthorUrl();
    loginUrl = loginUrl.replace('clientValue', Common.GetClienId());
    var url = window.location.href.split("?");
    let originUrl: string = encodeURI(url[0].replaceAll("#/", ""));
    loginUrl = loginUrl.replace('redirecUrl', originUrl);
    loginUrl = loginUrl.replace('agencyValue', '0');
    window.location.replace(loginUrl);
  }
}
