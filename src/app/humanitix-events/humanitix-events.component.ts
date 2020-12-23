import { Component, OnInit } from '@angular/core';
import { HumanitixService } from '../humanitix.service';

@Component({
  selector: 'app-humanitix-events',
  templateUrl: './humanitix-events.component.html',
  styleUrls: ['./humanitix-events.component.css']
})
export class HumanitixEventsComponent implements OnInit {
  events: any[];

  constructor(public humanitixService: HumanitixService) { }

  ngOnInit(): void {
    this.humanitixService.getEvents().subscribe(e => this.events = e.events);
  }

}
