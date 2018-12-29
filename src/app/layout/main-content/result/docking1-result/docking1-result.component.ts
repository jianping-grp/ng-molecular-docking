import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {RestService} from '../../../../service/rest/rest.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {PageMeta} from '../../../../models/page-meta';
import {merge} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {Docking} from '../../../../models/docking';
import {of as observableOf} from 'rxjs';

@Component({
  selector: 'app-docking1-result',
  templateUrl: './docking1-result.component.html',
  styleUrls: ['./docking1-result.component.css']
})
export class Docking1ResultComponent implements OnInit, AfterViewInit {
  pageMeta = new PageMeta();
  dataSource = new MatTableDataSource();
  isLoading = false;
  isLoadingError = false;
  dockings: Docking[];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSizeOptions = [5, 10, 20, 50, 100];
  proteinUrl: string;
  pageSize = 10;
  displayedColumns = [
    'work_name', 'work_decs', 'size_x', 'size_y', 'size_z', 'center_x', 'center_y', 'center_z', 'pdb_file', 'lig_file',
     'affinity', 'add_time', 'status'
  ];


  constructor(private rest: RestService) {
  }

  ngOnInit() {
    this.pageMeta.per_page = this.pageSize;
  }


  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.pageMeta.page = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          return this.rest.getDataList(
            'autodockorders/?',
            this.paginator.pageIndex,
            this.paginator.pageSize,
            this.sort.direction === 'desc' ? `-${this.sort.active}` : this.sort.active,
          );
        }),
        map(data => {
          this.isLoading = false;
          this.isLoadingError = false;
          this.pageMeta = data['meta'];
          console.log('data:', data['auto_docks']); // todo delete
          return data['auto_docks'];
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
}
