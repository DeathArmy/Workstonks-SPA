import { TicketOverlayRef } from '../ticket-overlay/ticket-overlay.component';
import { OverlayServiceService } from '../../services/overlayService.service';
import { Component, OnInit } from '@angular/core';
import { FormService } from '../../services/form.service';
import { formFieldsModel } from '../../Models/formFields';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
  providers: [FormService]
})
export class TicketComponent implements OnInit {

  tickets = new Array<formFieldsModel>();

  constructor(private fs: FormService, private viewTicket: OverlayServiceService) {
    this.fs.getForms().subscribe(ticks => {
      for (let tick of ticks)
      {
        this.tickets.push(tick);
      }
    })
  }

  ngOnInit(): void {
  }

  showTicket() {
    let dialogRef: TicketOverlayRef = this.viewTicket.open();
  }

}
