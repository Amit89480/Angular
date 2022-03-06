import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, catchError, map, tap, throwError } from 'rxjs';
import { User } from '../user';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  user = new BehaviorSubject<User>(null);
  private expirationTimer: any;
  private password = null;

  constructor(
    private http: HttpClient,

    private router: Router
  ) { }
  table_name = 'users.json';

  checkEmail() {
    return this.http.get(environment.apiUrl + this.table_name).pipe(
      map(res => {
        const arr = [];
        for (const r in res) {
          if (res.hasOwnProperty(r)) {
            arr.push({ ...res[r], id: r })
          }
        }
        return arr;
      }));
  }

  addUser(user: any) {
    return this.http.post(environment.apiUrl + this.table_name, user);
  }
  signUpUser(email, password) {
    return this.http.post
      (environment.signUpUrl + environment.apikey,
        {email: email, password: password});
  }

  loginUser(email, password) {
    this.password = password;
    return this.http
      .post<any>(environment.signInUrl + environment.apikey, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  autoLogin() {
    if (localStorage.getItem('user')) {
      const userData: {
        email: string;
        id: string;
        dbUserId: string,
        _token: string;
        type: string,
        _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('user'));
      const loadUser = new User(
        userData.email,
        userData.id,
        userData.dbUserId,
        userData._token,
        userData.type,
        new Date(userData._tokenExpirationDate)
      );
      if (loadUser.getToken()) {
        this.user.next(loadUser);
        const expirationDuration =
          new Date(userData._tokenExpirationDate).getTime() -
          new Date().getTime();
        this.autoLogout(expirationDuration);
      }
    }
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unkown error occure';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email address not found';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid password';
        break;
      case 'USER_DISABLED':
        errorMessage = 'Account disabled';
        break;
    }
    //this.LogService.generateLog();
    return throwError(errorMessage);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    this.http.get<any>(environment.apiUrl + this.table_name).pipe(
      map(res => {
        const arr = [];
        for (const r in res) {
          if(res.hasOwnProperty(r)) {
            arr.push({...res[r], id: r})
          }
        }
        return arr;
      })).subscribe(users => {
        let u = users.find(o => o.email == email);
        if (u.password == this.password) {
          const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
          const user = new User(email, userId, u.id, token, u.type, expirationDate);
          this.user.next(user);
          this.autoLogout(expiresIn * 1000);
          localStorage.setItem('user', JSON.stringify(user));
          if (u.type == 'admin') {
            this.router.navigate(['/admin']);
          } else if (u.type == 'user') {
            this.router.navigate(['/']);
          }
        }
      });
  }

  public logout() {
    this.user.next(null);
    localStorage.removeItem('user');
    if (this.expirationTimer) {
      clearTimeout(this.expirationTimer);
    }
    this.expirationTimer = null;
  }
  autoLogout(expirationDuration: number) {
    this.expirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
  getUsers(){
    return this.http.get<any>(environment.apiUrl + this.table_name).pipe(
      map(res => {
        const arr = [];
        for (const r in res) {
          if(res.hasOwnProperty(r)) {
            arr.push({...res[r], id: r})
          }
        }
        return arr;
      }))
  }
}
