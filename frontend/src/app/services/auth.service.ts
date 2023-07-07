import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _api: ApiService) { }

  signIn(credential: {}): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._api.post('/api/users/auth', credential)
        .then((res: any) => {
          resolve(res);
        });
    })
  }

  signOut(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._api.post('/api/users/logout')
      .then((res: any) => {
        if (res && res.hasOwnProperty('message')) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
    })
  }
  
  authenticated(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (localStorage.getItem('userInfo')) {
        resolve(true);
      } else {
        resolve(false);
      }
    })
  }

  setCredential(credential: any): void {  
    localStorage.setItem('userInfo', JSON.stringify(credential));
  }

  clearCredential(): void {
    localStorage.removeItem('userInfo');
  }

}
