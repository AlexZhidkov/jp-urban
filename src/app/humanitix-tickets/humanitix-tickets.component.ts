import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HumanitixService } from '../humanitix.service';

@Component({
  selector: 'app-humanitix-tickets',
  templateUrl: './humanitix-tickets.component.html',
  styleUrls: ['./humanitix-tickets.component.css']
})
export class HumanitixTicketsComponent implements OnInit {
  tickets: any;

  constructor(
    private route: ActivatedRoute,
    private humanitixService: HumanitixService
  ) { }

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('eventId');
    const dateId = this.route.snapshot.paramMap.get('dateId');
    this.humanitixService.getTickets(eventId, dateId).subscribe(e => this.tickets = e.tickets);
  }

}
