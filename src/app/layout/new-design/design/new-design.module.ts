import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DockingComponent } from './docking/docking.component';
import { SeaComponent } from './sea/sea.component';
import { MmGbsaComponent } from './mm-gbsa/mm-gbsa.component';
import {SharedModule} from '../../../shared/shared.module';
import {NewDesignRoutingModule} from './new-design-routing.module';

@NgModule({
  declarations: [DockingComponent, SeaComponent, MmGbsaComponent],
  imports: [
    CommonModule,
    SharedModule,
    NewDesignRoutingModule
  ]
})
export class NewDesignModule { }
