import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contacts } from '../models/contacts';

@Injectable({
  providedIn: 'root'
})

export class ContactService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) { }

  getContacts(): Observable<Contacts[]>{
    return this.http.get<Contacts[]>(this.apiUrl);
  } 

  getContact(id: string): Observable<Contacts>{
    return this.http.get<Contacts>(this.apiUrl,
      {
        params: { id: id}
      }
      );
  } 
}
