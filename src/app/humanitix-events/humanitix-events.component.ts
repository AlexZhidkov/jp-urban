import { Component, OnInit } from '@angular/core';
import { HumanitixService } from '../humanitix.service';
@Component({
  selector: 'app-humanitix-events',
  templateUrl: './humanitix-events.component.html',
  styleUrls: ['./humanitix-events.component.css']
})
export class HumanitixEventsComponent implements OnInit {
  events: any[];
  isLoading: boolean;

  constructor(public humanitixService: HumanitixService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.humanitixService.getEvents().subscribe(e => {
      this.events = e.events;
      this.isLoading = false;
    });
  }
}
