import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ContactService } from './contact.service';

@Injectable({
  providedIn: 'root'
})
export class ContactDetailsResolver implements Resolve<any> {

  constructor(private api: ContactService,
              private router: Router) { }

  resolve(route: ActivatedRouteSnapshot){
    return this.api.getContact(route.params["id"]);
    }
  }
