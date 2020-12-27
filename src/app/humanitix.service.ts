import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HumanitixService {
  private getDataCallable: any;
  constructor(
    private fns: AngularFireFunctions
  ) {
    this.getDataCallable = this.fns.httpsCallable('getDataFromHumanitixApi');
  }

  getEvents(): Observable<any> {
    return this.getDataCallable('events');
  }

  getEvent(id: string): Observable<any> {
    return this.getDataCallable(`event?eventId=${id}`);
  }

  getTickets(eventId: string, dateId: string): Observable<any> {
    return this.getDataCallable(`tickets?eventDateId=${dateId}&eventId=${eventId}`);
  }
}
