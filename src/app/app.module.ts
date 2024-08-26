import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterPageComponent } from './views/defaults/footer/footer-page.component';
import { HeaderPageComponent } from './views/defaults/header-page/header-page/header-page.component';
import { HomePageComponent } from './views/home-page/home-page/home-page.component';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { QuestPageComponent } from './views/quest-page/quest-page.component'
@NgModule({
  declarations: [
    AppComponent,
    FooterPageComponent,
    HeaderPageComponent,
    HomePageComponent,
    QuestPageComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
