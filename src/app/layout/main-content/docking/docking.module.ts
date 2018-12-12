import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlineDockingComponent } from './online-docking/online-docking.component';
import {SharedModule} from '../../../shared/shared.module';
import { DockingDocumentComponent } from './docking-document/docking-document.component';
import { DockingIntroductionComponent } from './docking-introduction/docking-introduction.component';
import {DockingRoutingModule} from './docking-routing.module';
import { DockingLibraryIntroductionComponent } from './docking-library-introduction/docking-library-introduction.component';
import { DockingPlatformIntroductionComponent } from './docking-platform-introduction/docking-platform-introduction.component';
import {DockingHomeComponent} from './docking-home/docking-home.component';
import {OnlineDocking2Component} from './online-docking2/online-docking2.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DockingRoutingModule
  ],
  declarations: [
    OnlineDockingComponent,
    DockingDocumentComponent,
    DockingHomeComponent,
    DockingIntroductionComponent,
    DockingLibraryIntroductionComponent,
    DockingPlatformIntroductionComponent,
    OnlineDocking2Component
  ]
})
export class DockingModule {

}
