import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  data: any;

  constructor(private fns: AngularFireFunctions) { }

  ngOnInit(): void {
    const callable = this.fns.httpsCallable('getListOfEvents');
    this.data = callable({});
    this.data.subscribe(d => { debugger; });
  }

}
