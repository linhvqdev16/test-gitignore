import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { config } from 'process';
import { HomePageComponent } from './views/home-page/home-page/home-page.component';
import { QuestPageComponent } from './views/quest-page/quest-page.component';
import { CommonModule } from '@angular/common';
import { GameListPageComponent } from './views/game-list-page/game-list-page.component';
import { PersonalPageComponent } from './views/personal-page/personal-page.component';
import { RegisterGamerPageComponent } from './views/register-gamer-page/register-gamer-page.component';
import { ReportCommonComponent } from './views/report/report-common/report-common.component';

const routes: Routes = [
    {path: 'home-page', component: HomePageComponent}, 
    {path: 'quest-page', component: QuestPageComponent}, 
    {path: 'game-list-page', component: GameListPageComponent}, 
    {path: 'personal-page', component: PersonalPageComponent}, 
    {path: 'register-gamer-page', component: RegisterGamerPageComponent}, 
    {path: 'report-common', component: ReportCommonComponent}
];

@NgModule({
  imports: [ CommonModule ,RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
