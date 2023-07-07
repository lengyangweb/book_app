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
  
  authenticated(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      localStorage.getItem('userInfo') ? true : false ? resolve(true) : resolve(false);
    })
  }

  setCredential(credential: any): void {  
    localStorage.setItem('userInfo', JSON.stringify(credential));
  }

  clearCredential(): void {
    localStorage.removeItem('userInfo');
  }

}
