import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _api: ApiService) { }

  updateUserInfo(userInfo: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._api.update('/api/users/profile', userInfo)
        .then((res: any) => resolve(res));
    });
  }

}
