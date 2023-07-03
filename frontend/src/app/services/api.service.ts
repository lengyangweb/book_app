import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  /**
   * Get a single resource
   * @param url api endpoint
   * @param param parameter
   * @returns a promise
   */
  get(url: string, param: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._http.get<any>(url, param).subscribe((res: any) => resolve(res));
    });
  }

  /**
   * Get many resources
   * @param url api endpoint
   * @returns a promise
   */
  gets(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._http.get<any>(url).subscribe((res: any) => resolve(res));
    });
  }

  /**
   * Create resource
   * @param url api endpoint
   * @param params parameters
   * @returns a promise
   */
  post(url: string, params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._http.post<any>(url, params).subscribe((res: any) => resolve(res));
    });
  }

  /**
   * Update a resource
   * @param url api endpoint
   * @param params parameters
   * @returns a promise
   */
  update(url: string, params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._http.put<any>(url, params).subscribe((res: any) => resolve(res));
    });
  }

  /**
   * Remove a resource
   * @param url api endpoint
   * @param param parameter
   * @returns a promise
   */
  delete(url: string, param: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._http.delete<any>(`${url}/${param}`).subscribe((res: any) => resolve(res));
    });
  }

}