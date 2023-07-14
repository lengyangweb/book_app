import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _api: ApiService) { }

  getUserProfile(email: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._api.get('/api/users/profile', { email })
        .then((res: any) => resolve(res));
    })
  }

  updateUserInfo(userInfo: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._api.update('/api/users/profile', userInfo)
        .then((res: any) => resolve(res));
    });
  }

}
