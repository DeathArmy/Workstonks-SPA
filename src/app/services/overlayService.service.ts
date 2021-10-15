import { TicketOverlayRef } from './../employee-app/ticket-overlay/ticket-overlay.component';
import { Injectable } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { TicketOverlayComponent } from '../employee-app/ticket-overlay/ticket-overlay.component';

interface TicketViewConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
}

const DEFAULT_CONFIG: TicketViewConfig = {
  hasBackdrop: true,
  //backdropClass: 'dark-backdrop',
  panelClass: 'tm-file-preview-dialog-panel'
}

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class OverlayServiceService {

  constructor(private overlay: Overlay) { }

  open(config: TicketViewConfig = {})  {
    const overlayConfig = {...DEFAULT_CONFIG, ...config};
    const overlayRef = this.createOverlay(overlayConfig);
    const dialogRef = new TicketOverlayRef(overlayRef);
    const ticketView = new ComponentPortal(TicketOverlayComponent);
    overlayRef.attach(ticketView);

    overlayRef.backdropClick().subscribe(_ => dialogRef.close());

    return dialogRef;
  }

  private createOverlay(config: TicketViewConfig) {
    const overlayConfig = this.getOverlayConfig(config);
    return this.overlay.create(overlayConfig);
  }

  private getOverlayConfig(config: TicketViewConfig): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });

    return overlayConfig;
  }
}
