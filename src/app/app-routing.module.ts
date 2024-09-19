import { Injectable, NgModule } from '@angular/core';
import { DefaultUrlSerializer, RouterModule, Routes, UrlSegment, UrlSerializer, UrlTree } from '@angular/router';
import { HomePageComponent } from './views/home-page/home-page/home-page.component';
import { QuestPageComponent } from './views/quest-page/quest-page.component';
import { CommonModule } from '@angular/common';
import { GameListPageComponent } from './views/game-list-page/game-list-page.component';
import { PersonalPageComponent } from './views/personal-page/personal-page.component';
import { RegisterGamerPageComponent } from './views/register-gamer-page/register-gamer-page.component';
import { ReportCommonComponent } from './views/report/report-common/report-common.component';
import { InfluencerPageComponent } from './views/influencer-page/influencer-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home-page', pathMatch: 'full' },
    {path: 'home-page', component: HomePageComponent}, 
    {path: 'quest-page', component: QuestPageComponent}, 
    {path: 'game-list-page', component: GameListPageComponent}, 
    {path: 'personal-page', component: PersonalPageComponent}, 
    {path: 'register-gamer-page', component: RegisterGamerPageComponent}, 
    {path: 'report-common', component: ReportCommonComponent},
    {path: 'influencer-page', component: InfluencerPageComponent},
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ CommonModule ,RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
