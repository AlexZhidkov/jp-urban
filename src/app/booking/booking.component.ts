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

  constructor(private fns: AngularFireFunctions) { }

  ngOnInit(): void {
    const callable = this.fns.httpsCallable('getListOfEvents');
    this.data = callable({});
    this.data.subscribe(d => { debugger; });
  }

}
