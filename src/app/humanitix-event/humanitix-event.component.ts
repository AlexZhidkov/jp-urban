import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HumanitixService } from '../humanitix.service';

@Component({
  selector: 'app-humanitix-event',
  templateUrl: './humanitix-event.component.html',
  styleUrls: ['./humanitix-event.component.css']
})
export class HumanitixEventComponent implements OnInit {
  event: any;
  isLoading: boolean;

  constructor(
    private route: ActivatedRoute,
    private humanitixService: HumanitixService
  ) { }

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    this.isLoading = true;

    this.humanitixService.getEvent(eventId).subscribe(e => {
      this.event = e;
      this.isLoading = false;
    });
  }

}
