import { Component, OnInit } from '@angular/core';
import {RestService} from '../../../../service/rest/rest.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private rest: RestService) {
  }

  ngOnInit() {
    this.rest.postData('machun', {ma: 'chunfeng'});
  }

}
