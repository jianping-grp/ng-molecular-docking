import {RouterModule, Routes} from '@angular/router';
import {DockingComponent} from './docking/docking.component';
import {SeaComponent} from './sea/sea.component';
import {MmGbsaComponent} from './mm-gbsa/mm-gbsa.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {
    path: 'docking',
    component: DockingComponent
  },
  {
    path: 'sea',
    component: SeaComponent
  },
  {
    path: 'mm-gbsa',
    component: MmGbsaComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class NewDesignRoutingModule { }
