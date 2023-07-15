import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

export interface PasswordUpdate {
  _id?: String,
  password: String
}

export interface User {
  _id?: String,
  name: String,
  email: String
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _api: ApiService) { }

  getUserProfile(): Promise<User> {
    return new Promise((resolve, reject) => {
      const userInfoStr = localStorage.getItem('userInfo');
      userInfoStr ? resolve(JSON.parse(userInfoStr)) : null;
    })
  }

  updateUserInfo(userInfo: User): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._api.update('/api/users/profile', userInfo)
        .then((res: any) => resolve(res));
    });
  }

  updateUserPassword(password: PasswordUpdate): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._api.update('/api/users/profile', password)
        .then((user: User) => user._id ? resolve(true) : resolve(false));
    })
  }

}
