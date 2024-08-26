import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { config } from 'process';
import { HomePageComponent } from './views/home-page/home-page/home-page.component';
import { QuestPageComponent } from './views/quest-page/quest-page.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
    {path: 'home-page', component: HomePageComponent}, 
    {path: 'quest-page', component: QuestPageComponent}
];

@NgModule({
  imports: [ CommonModule ,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
