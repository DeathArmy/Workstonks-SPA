import { formFieldsModel } from 'src/app/Models/formFields';
import { TicketOverlayRef } from '../ticket-overlay/ticket-overlay.component';
import { OverlayServiceService } from '../../services/overlayService.service';
import { Component, OnInit } from '@angular/core';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
  providers: [FormService]
})
export class TicketComponent implements OnInit {

  tickets = new Array<formFieldsModel>();

  constructor(private fs: FormService, private viewTicket: OverlayServiceService) {
    this.fs.getForms(0).subscribe(ticks => {
      for (let tick of ticks)
      {
        this.tickets.push(tick);
      }
    })
  }

  ngOnInit(): void {
  }

  showTicket(i: any) {
    let dialogRef: TicketOverlayRef = this.viewTicket.open(
      {
       data: this.tickets[i]
      });
    this.viewTicket.forceRealoadPage.subscribe(() => window.location.reload());
  }

  showBlankTicket() {
    let dialogRef: TicketOverlayRef = this.viewTicket.open(
      {
      });
    this.viewTicket.forceRealoadPage.subscribe(() => window.location.reload());
  }
}
