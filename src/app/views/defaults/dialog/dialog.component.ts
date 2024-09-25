import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Common } from '../../../commons/common';
import { UrlDefine } from '../../../commons/url-define';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  constructor(private dialog: MatDialogRef<DialogComponent>) { };

  onLogin(){
    debugger;
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
