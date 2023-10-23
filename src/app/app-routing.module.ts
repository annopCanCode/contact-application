import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { ContactDetailsResolver } from './services/contact-details.service';

const routes: Routes = [
  { path: '', component: ContactComponent },
  { path: 'details/:id', component: ContactDetailsComponent, resolve: { ContactDetails: ContactDetailsResolver}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [ContactComponent, ContactDetailsComponent]
