import { FILE_PREVIEW_DIALOG_DATA } from './../employee-app/ticket-overlay/tikcet-overlay.tokens';
import { formFieldsModel } from './../Models/formFields';
import { TicketOverlayRef } from './../employee-app/ticket-overlay/ticket-overlay.component';
import { Injectable, Injector, ComponentRef } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { TicketOverlayComponent } from '../employee-app/ticket-overlay/ticket-overlay.component';

interface TicketViewConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
  data?: formFieldsModel;
  ref?: OverlayRef;
}

const DEFAULT_CONFIG: TicketViewConfig = {
  hasBackdrop: true,
  //backdropClass: 'dark-backdrop',
  panelClass: 'tm-file-preview-dialog-panel'
}

@Injectable()
export class OverlayServiceService {

  constructor(
    private injector: Injector,
    private overlay: Overlay) { }

  open(config: TicketViewConfig = {})  {
    const overlayConfig = {...DEFAULT_CONFIG, ...config};
    const overlayRef = this.createOverlay(overlayConfig);
    const dialogRef = new TicketOverlayRef(overlayRef);
    const ticketView = new ComponentPortal(TicketOverlayComponent, null, Injector.create({parent: this.injector, providers: [ {provide: FILE_PREVIEW_DIALOG_DATA, useValue: config.data}]}));
    let ref = overlayRef.attach(ticketView);

    //overlayRef.backdropClick().subscribe(_ => dialogRef.close());

    ref.instance.closeOverlay.subscribe(() => dialogRef.close());

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
