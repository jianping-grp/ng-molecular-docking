import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {GlobalService} from '../global/global.service';
import {Observable, Subject} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {catchError, map} from 'rxjs/internal/operators';
import {User} from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private restHost = environment.REST_HOST;
  currentUser = new Subject<any>();
  constructor(private http: HttpClient,
              private globalService: GlobalService) {

  }

  public  getDataList(url: string, page = 0, perPage = 10, sortby = '') {
    let sortParam = '';
      if (sortby !== '') {
        sortParam = `&sort[]=${sortby}`;
      }
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    this.globalService.setLoading(true);
    return this.http.get(`${this.restHost}/${url}&page=${page}&perPage=${perPage}${sortParam}`, {
      headers: new HttpHeaders().set('Authorization', `Token ${storedUser['user_token']}`)
    }).pipe(
      // finalize(() => this.globalService.setLoading(true)),
      // catchError(this.handleError)
  );
  }


  public postData(url: string, body: object, ): Observable<any> {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    // this.globalService.setLoading(true);
    return this.http.post(`${this.restHost}/${url}`, body,
      {headers: new HttpHeaders().set('Authorization', `Token ${storedUser['user_token']}`)});
      // .pipe(finalize(() => this.globalService.setLoading(true)));
  }

  public postDataList(url: string, body: object): Observable<any> {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    this.globalService.setLoading(true);
    return this.http.post(`${this.restHost}/${url}`, body,
      {headers: new HttpHeaders().set('Authorization', `Token ${storedUser['user_token']}`)})
      .pipe(finalize(() => this.globalService.setLoading(true)));
  }

  registry(body: any) {
    return this.http.post(`${this.restHost}/registers/`, body);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.restHost}/rest-auth/login/`, {username: username, password: password})
      .pipe(map((res: Response) => {
        if (res && res['key']) {
          const user = {
            user_token: res['key'],
            user_name: username
          };
          console.log('login token', user); // todo delete
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUser.next(user);
          return user;
        } else {
          return null;
        }
      }));
  }

  getUser(username: string): Observable<any> {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.get(`${this.restHost}/rest-auth/user/`,
      {headers: new HttpHeaders().set('Authorization', `Token ${storedUser['user_token']}`)})
      .pipe(catchError(this.handleError));
        // todo add catch Errors
      // )
  }

  changePassword(body: any) {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.post(`${this.restHost}/rest-auth/password/change/`, body,
      {headers: new HttpHeaders().set('Authorization', `Token ${storedUser['user_token']}`)})
      .pipe(catchError(this.handleError));
  }

  logout(): void {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    this.http.post(`${this.restHost}/auth/logout/`, {},
      {headers: new HttpHeaders().set('Authorization', `Token ${storedUser['user_token']}`)});

    localStorage.removeItem('currentUser');
    const removedToken = localStorage.getItem('currentUser');
    this.currentUser.next(removedToken);
  }

  private handleError(error: any) {
    if (error instanceof HttpErrorResponse) {
      const errMsg = `${error.status} - ${error.statusText}; error: ${error.error}`;
      console.log(errMsg);
      return errMsg;
    } else {
      return error.message;
    } // todo modify error
  }

}
