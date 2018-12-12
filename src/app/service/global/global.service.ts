import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }
  private _globalLoading = new Subject<boolean>();
  loadingStatus$ = this._globalLoading.asObservable();

  setLoading(status: boolean): void {
    this._globalLoading.next(status);
  }
}
