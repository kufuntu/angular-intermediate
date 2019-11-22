import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  getContactList(term: string): Observable<User[]> {
    return this.http.get<User[]>(this.getContactListUrl, {
      params: { term }
    });
  }

  getContact(id: string): Observable<User> {
    return this.http.get<User>(this.getContactUrl(id));
  }

  getContactUrl(id: string) {
    return environment.api + '/contact/' + id;
  }

  get getContactListUrl() {
    return environment.api + '/contact/list';
  }

}
