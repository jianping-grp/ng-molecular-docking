import {Injectable, NgZone} from '@angular/core';
import {Subject} from 'rxjs';

declare const JSApplet: any;
@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  // jsme
  JSMEApplet$ = new Subject<any>();

  constructor(private zone: NgZone) {
    this.zone.runOutsideAngular(() => {
      window['jsmeOnload'] = () => {
        console.log('JSME init');
        this.JSMEApplet$.next(JSApplet);
      };
    });
  }

  private _globalLoading = new Subject<boolean>();
  loadingStatus$ = this._globalLoading.asObservable();

  setLoading(status: boolean): void {
    this._globalLoading.next(status);
  }
}
