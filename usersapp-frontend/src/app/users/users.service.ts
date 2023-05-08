import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../types/user.model';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiUrl = 'http://localhost:3000/users';

  constructor(private _http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this._http.get<User[]>(this.apiUrl);
  }

  addUser(data: User): Observable<User> {
    return this._http.post<User>(this.apiUrl, data);
  }

  deleteUser(id: number): Observable<number> {
    return this._http.delete<number>(`${this.apiUrl}/${id}`);
  }

  updateUser(id: number, data: User): Observable<User> {
    return this._http.put<User>(`${this.apiUrl}/${id}`, data);
  }
}
