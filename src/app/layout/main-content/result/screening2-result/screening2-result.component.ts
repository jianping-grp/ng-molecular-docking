
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {RestService} from '../../../../service/rest/rest.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {PageMeta} from '../../../../models/page-meta';
import {merge} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {of as observableOf} from 'rxjs';
import {ScreenResult} from '../../../../models/screen-result';
@Component({
  selector: 'app-screening2-result',
  templateUrl: './screening2-result.component.html',
  styleUrls: ['./screening2-result.component.css']
})

export class Screening2ResultComponent implements OnInit, AfterViewInit {
  pageMeta = new PageMeta();
  dataSource = new MatTableDataSource();
  isLoading = false;
  isLoadingError = false;
  screenResultList: ScreenResult[];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSizeOptions = [5, 10, 20, 50, 100];
  proteinUrl: string;
  displayedColumns = [
    'work_name', 'work_decs', 'pdb_file', 'mol_db', 'user_db',
    'add_time', 'status'
  ];


  constructor(private rest: RestService) {
  }

  ngOnInit() {
  }


  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.pageMeta.page = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          return this.rest.getDataList(
            'virtualscreen2orders/?',
            this.paginator.pageIndex,
            this.paginator.pageSize,
            this.sort.direction === 'desc' ? `-${this.sort.active}` : this.sort.active,
          );
        }),
        map(data => {
          this.isLoading = false;
          this.isLoadingError = false;
          this.pageMeta = data['meta'];
          return data['virtual_screen2s'];
        }),
        catchError(() => {
          this.isLoadingError = true;
          this.isLoading = false;
          return observableOf([]);
        })
      )
      .subscribe(
        data => this.dataSource.data = data
      );
  }

  displayResult(pdbUrl: string): void {
    this.proteinUrl = pdbUrl;
  }

  getProteinUrlList(workName: string): void {
    this.rest.getDataList(`screens/?filter{work_name}=${workName}&filter{screen_cat}=screen2`, 0, 10, '-affinity')
      .subscribe(data => {
        this.screenResultList = data['screens'];
      });
  }
}
