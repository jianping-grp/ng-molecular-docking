import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {NewDocking} from '../../../../models/new-disign-models/new-docking';
import {PageMeta} from '../../../../models/page-meta';
import {merge} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {RestService} from '../../../../service/rest/rest.service';
import {of as observableOf} from 'rxjs';

@Component({
  selector: 'app-sea-result',
  templateUrl: './sea-result.component.html',
  styleUrls: ['./sea-result.component.css']
})
export class SeaResultComponent implements OnInit, AfterViewInit {

  pageMeta = new PageMeta();
  dataSource = new MatTableDataSource();
  isLoading = false;
  isLoadingError = false;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSizeOptions = [5, 10, 20, 50, 100];
  pageSize = 10;
  displayedColumns = [
    'work_name',  'smiles', 'target', 'mol_db', 'pdb_file', 'add_time', 'status', 'resn',
  ];
  allColumns = [
    'work_name',  'smiles', 'target', 'mol_db', 'pdb_file', 'add_time', 'status', 'resn',
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
            'virscreenorder/?',
            this.paginator.pageIndex,
            this.paginator.pageSize,
            this.sort.direction === 'desc' ? `-${this.sort.active}` : this.sort.active,
          );
        }),
        map(data => {
          this.isLoading = false;
          this.isLoadingError = false;
          this.pageMeta = data['meta'];
          console.log('data:', data['vir_screens']); // todo delete
          return data['vir_screens'];
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
