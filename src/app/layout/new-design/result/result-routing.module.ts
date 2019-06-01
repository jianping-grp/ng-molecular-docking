import {RouterModule, Routes} from '@angular/router';
import {DockingResultComponent} from './docking-result/docking-result.component';
import {SeaResultComponent} from './sea-result/sea-result.component';
import {GbsaResultComponent} from './gbsa-result/gbsa-result.component';
import {NgModule} from '@angular/core';
import {ResultHomeComponent} from './result-home/result-home.component';

const routes: Routes = [
  {
    path: 'result-home',
    component: ResultHomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'docking-result',
        pathMatch: 'full'
      },
      {
        path: 'docking-result',
        component: DockingResultComponent
      },
      {
        path: 'sea-result',
        component: SeaResultComponent
      },
      {
        path: 'gbsa-result',
        component: GbsaResultComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ResultRoutingModule { }
