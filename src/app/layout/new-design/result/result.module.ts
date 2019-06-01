import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DockingResultComponent } from './docking-result/docking-result.component';
import { SeaResultComponent } from './sea-result/sea-result.component';
import { GbsaResultComponent } from './gbsa-result/gbsa-result.component';
import {SharedModule} from '../../../shared/shared.module';
import {ResultRoutingModule} from './result-routing.module';
import {ResultHomeComponent} from './result-home/result-home.component';

@NgModule({
  declarations: [
    DockingResultComponent,
    SeaResultComponent,
    GbsaResultComponent,
    ResultHomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ResultRoutingModule
  ]
})
export class ResultModule { }
