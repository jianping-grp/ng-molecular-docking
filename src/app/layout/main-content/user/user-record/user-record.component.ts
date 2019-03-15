import { Component, OnInit } from '@angular/core';
import {RestService} from '../../../../service/rest/rest.service';
import {GlobalService} from '../../../../service/global/global.service';
import {Docking} from '../../../../models/docking';
import {Docking2} from '../../../../models/docking2';
import {Screening} from '../../../../models/screening';
import {Screening2} from '../../../../models/screening2';

@Component({
  selector: 'app-user-record',
  templateUrl: './user-record.component.html',
  styleUrls: ['./user-record.component.css']
})
export class UserRecordComponent implements OnInit {
  dockingList: Docking[];
  docking2List: Docking2[];
  screeningList: Screening[];
  screening2List: Screening2[];
  constructor(private rest: RestService,
              private globalService: GlobalService) { }

  ngOnInit() {
  }

  getDockingRecord() {
    this.rest.getDataList(`autodockorders`)
      .subscribe(data => {
         this.dockingList = data['auto_docks'];
      });
  }

  getDocking2Record() {
    this.rest.getDataList(`autoduckorders`)
      .subscribe(data => {
        this.docking2List = data['results'];
      });
  }

  getScreeningRecord() {
    this.rest.getDataList(`virtualscreenorders`)
      .subscribe(data => {
        this.screeningList = data['results'];
      });
  }

  getScreening2Record() {
    this.rest.getDataList(`virtualscreenorders`)
      .subscribe(data => {
        this.screening2List = data['results'];
      });
  }

}
