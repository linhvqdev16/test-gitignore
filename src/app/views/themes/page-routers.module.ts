import { RouterModule, Routes } from "@angular/router";
import path from "path";
import { QuestPageComponent } from "../quest-page/quest-page.component";
import { HomePageComponent } from "../home-page/home-page/home-page.component";
import { NgModel } from "@angular/forms";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        children: [
            {
                path: "home-page",
                component: HomePageComponent
            },
            {
                path: "quest-page",
                component: QuestPageComponent,
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PageRouteModule {

}