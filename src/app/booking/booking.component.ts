import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireFunctions } from '@angular/fire/functions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

interface CalendarTime {
  dateTime: string;
}
interface CalendarEvent {
  id: string;
  start: CalendarTime;
  startDate: string;
  startTime: string;
  end: CalendarTime;
  endDate: string;
  endTime: string;

}
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  calendarEvents: CalendarEvent[];
  isLoading: boolean;

  constructor(
    private auth: AngularFireAuth,
    private fns: AngularFireFunctions,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.isLoading = true;
    const getListOfEvents = this.fns.httpsCallable('getListOfEvents');
    getListOfEvents({}).subscribe(d => {
      this.calendarEvents = d.items;
      this.calendarEvents.forEach(i => {
        i.startDate = new Date(i.start.dateTime).toDateString();
        i.startTime = `${new Date(i.start.dateTime).getHours()}:${(new Date(i.start.dateTime).getMinutes() + '00').substr(0, 2)}`;
        i.endDate = new Date(i.end.dateTime).toDateString();
        if (i.startDate === i.endDate) { i.endDate = ''; }
        i.endTime = `${new Date(i.end.dateTime).getHours()}:${(new Date(i.end.dateTime).getMinutes() + '00').substr(0, 2)}`;
      });
      this.isLoading = false;
    });
  }

  bookTime(event: CalendarEvent): void {
    this.isLoading = true;
    this.auth.user.subscribe(user => {
      const bookEvent = this.fns.httpsCallable('bookEvent');
      const eventUpdate = {
        calendarId: 'primary',
        eventId: event.id,
        sendUpdates: 'all',
        requestBody: {
          source: {
            title: 'JP Urban App',
            url: 'https://jp-urban.web.app'
          },
          summary: user.displayName,
          description: `Booked a lesson with ${user.displayName}`,
          attendees: [
            {
              displayName: user.displayName,
              email: user.email,
            }
          ],
          end: event.end,
          start: event.start
        }
      };
      bookEvent(eventUpdate).subscribe(result => {
        this.isLoading = false;
        const message = (result.error) ? 'ERROR: ' + result.error : 'Booked successfully';
        this.snackBar.open(message, null, {
          duration: 3000
        });
        this.router.navigate(['/']);
      });
    });
  }
}
