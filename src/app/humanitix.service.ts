import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HumanitixService {

  humanitixUrl = 'https://console.humanitix.net/public/api/v1/';

  constructor(
    private auth: AngularFireAuth,
    private afs: AngularFirestore,
    private fns: AngularFireFunctions,
    private http: HttpClient
  ) { }

  private getHttpOptions(): Observable<any> {
    return this.auth.user.pipe(
      mergeMap((user) => {
        return this.afs.doc<any>(`users/${user.uid}`).get().pipe(map((doc) => {
          const apiKey = doc.data().humanitixApiKey;
          return {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'x-api-key': apiKey,
              'Access-Control-Allow-Origin': '*'
            })
          };
        }));
      })
    );
  }

  getEvents(): Observable<any> {
    const getEventsCallable = this.fns.httpsCallable('humanitixGetEvents');
    return getEventsCallable({});
    // return getEventsCallable.pipe(
    //   mergeMap(options => this.http.get(this.humanitixUrl + 'events', options))
    // );
  }

  getEvent(id: string): Observable<any> {
    const getEventCallable = this.fns.httpsCallable('humanitixGetEvent');
    return getEventCallable({ id });
    // return this.getHttpOptions().pipe(
    //   mergeMap(options => this.http.get(`${this.humanitixUrl}/event?eventId=${id}`, options))
    // );
  }

  getTickets(eventId: string, dateId: string): Observable<any> {
    const getTicketsCallable = this.fns.httpsCallable('humanitixGetTickets');
    return getTicketsCallable({ eventId, dateId });
    // return this.getHttpOptions().pipe(
    //   mergeMap(options => this.http.get(`${this.humanitixUrl}/tickets?eventDateId=${dateId}&eventId=${eventId}`, options))
    // );
  }
}
