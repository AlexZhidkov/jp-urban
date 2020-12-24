import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  data: Observable<any>;
  calendarEvents: any[];
  isLoading: boolean;

  constructor(private fns: AngularFireFunctions) { }

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

}
