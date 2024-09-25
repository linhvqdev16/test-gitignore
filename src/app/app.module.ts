import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterPageComponent } from './views/defaults/footer/footer-page.component';
import { HeaderPageComponent } from './views/defaults/header-page/header-page/header-page.component';
import { HomePageComponent } from './views/home-page/home-page/home-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuestPageComponent } from './views/quest-page/quest-page.component';
import { PersonalPageComponent } from './views/personal-page/personal-page.component';
import { RegisterGamerPageComponent } from './views/register-gamer-page/register-gamer-page.component';
import { ReportDepositsComponent } from './views/report/report-deposits/report-deposits.component';
import { ReportFollowComponent } from './views/report/report-follow/report-follow.component';
import { ReportInstallComponent } from './views/report/report-install/report-install.component';
import { ReportPointComponent } from './views/report/report-point/report-point.component';
import { ReportCommonComponent } from './views/report/report-common/report-common.component'
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpinnerPageComponent } from './views/defaults/spinner/spinner-page/spinner-page.component';
import { httpInterceptorProviders } from './services/base-services/http-request-interceptor-service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NumberPipe } from './commons/number-pipe';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SnackbarComponent } from './views/defaults/snackbar/snackbar.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { InfluencerPageComponent } from './views/influencer-page/influencer-page.component';
import {MatCardModule} from '@angular/material/card'
import {MatIconModule} from '@angular/material/icon'
import { DialogComponent } from './views/defaults/dialog/dialog.component';
import { DialogErrorComponent } from './views/defaults/dialog-error/dialog-error.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterPageComponent,
    HeaderPageComponent,
    HomePageComponent,
    QuestPageComponent,
    PersonalPageComponent,
    ReportDepositsComponent,
    ReportFollowComponent,
    ReportInstallComponent,
    ReportPointComponent,
    ReportCommonComponent,
    SpinnerPageComponent,
    NumberPipe,
    RegisterGamerPageComponent,
    SnackbarComponent,
    InfluencerPageComponent,
    DialogComponent,
    DialogErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule, 
    MatCardModule,
    MatIconModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent],
  exports: [
    NgxSpinnerModule
  ],
  schemas: [],
})
export class AppModule { }
