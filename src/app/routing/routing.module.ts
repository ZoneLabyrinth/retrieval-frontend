import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import {SearchingComponent} from '../searching/searching.component';
import {PublicOpionComponent} from "../public-opion/public-opion.component";
import {InnovativeComponent} from "../innovative/innovative.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/publicOpinion',
    pathMatch: 'full'
  },
  {
    path: 'searching',
    component: SearchingComponent
  },
  {
    path: 'publicOpinion',
    component: PublicOpionComponent
  },
  {
    path: 'innovative',
    component: InnovativeComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] //导出的是RouterModule，不是RoutingModule
})
export class RoutingModule {
}
