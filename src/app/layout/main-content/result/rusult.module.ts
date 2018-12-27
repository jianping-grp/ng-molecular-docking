import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Docking1ResultComponent} from './docking1-result/docking1-result.component';
import {Docking2ResultComponent} from './docking2-result/docking2-result.component';
import {Screening1ResultComponent} from './screening1-result/screening1-result.component';
import {Screening2ResultComponent} from './screening2-result/screening2-result.component';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  declarations: [
    Docking1ResultComponent,
    Docking2ResultComponent,
    Screening1ResultComponent,
    Screening2ResultComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class RusultModule { }
