import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from 'ngx-auth-firebaseui';
import { BookingComponent } from './booking/booking.component';
import { HomeComponent } from './home/home.component';
import { HumanitixEventComponent } from './humanitix-event/humanitix-event.component';
import { HumanitixEventsComponent } from './humanitix-events/humanitix-events.component';
import { HumanitixTicketsComponent } from './humanitix-tickets/humanitix-tickets.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'events', component: HumanitixEventsComponent, canActivate: [LoggedInGuard] },
  { path: 'event/:id', component: HumanitixEventComponent, canActivate: [LoggedInGuard] },
  { path: 'tickets/:eventId/:dateId', component: HumanitixTicketsComponent, canActivate: [LoggedInGuard] },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
