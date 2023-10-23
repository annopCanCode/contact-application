import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Contacts } from '../models/contacts';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit{
  destroy$: Subject<boolean> = new Subject();
  contactDetails: any;

  constructor(private router: Router,
              private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.data.pipe(takeUntil(this.destroy$)).subscribe((response: any) => {
      this.contactDetails = response.ContactDetails[0];
    })
  }

  contactList(){
    this.router.navigate(['/']).then(() => {
      location.reload();
    })
  }
}
