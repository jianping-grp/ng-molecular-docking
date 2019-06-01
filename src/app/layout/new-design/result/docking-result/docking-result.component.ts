import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {PageMeta} from '../../../../models/page-meta';
import {merge} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {RestService} from '../../../../service/rest/rest.service';
import {NewDocking} from '../../../../models/new-disign-models/new-docking';
import {of as observableOf} from 'rxjs';

@Component({
  selector: 'app-docking-result',
  templateUrl: './docking-result.component.html',
  styleUrls: ['./docking-result.component.css']
})
export class DockingResultComponent implements OnInit, AfterViewInit {

  pageMeta = new PageMeta();
  dataSource = new MatTableDataSource();
  isLoading = false;
  isLoadingError = false;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSizeOptions = [5, 10, 20, 50, 100];
  pageSize = 10;
  displayedColumns = [
    'work_name',   'algorithm', 'size_x', 'size_y', 'size_z', 'center_x', 'center_y', 'center_z',
    'pdb_file', 'lig_file', 'reference_file',
      'add_time', 'status',  'out_path', 'affinity', 'resn',
  ];
  allColumns = [
    'work_name',   'algorithm', 'size_x', 'size_y', 'size_z', 'center_x', 'center_y', 'center_z',
    'pdb_file', 'lig_file', 'reference_file',
    'add_time', 'status',  'out_path', 'affinity', 'resn',
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
            'dockorder/?',
            this.paginator.pageIndex,
            this.paginator.pageSize,
            this.sort.direction === 'desc' ? `-${this.sort.active}` : this.sort.active,
          );
        }),
        map(data => {
          this.isLoading = false;
          this.isLoadingError = false;
          this.pageMeta = data['meta'];
          console.log('data:', data['docks']); // todo delete
          return data['docks'];
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

}
