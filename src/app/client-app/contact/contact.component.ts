import { ConfigService } from '../../services/config.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contact = new contact;

  iframeMap: any;
  iframeMapSafe: any;

  constructor(private santizier: DomSanitizer, private contactConfig: ConfigService) {
    this.contactConfig.getConfig("contact").subscribe(contact => {
      if (contact == null) {
        console.log("Brak konfiguracji dla Contact.");
      }
      else {
        this.contact = JSON.parse(<string>contact.data);
        this.iframeMap = "<iframe width='100%' height='600' frameborder='0' scrolling='no' marginheight='0' marginwidth='0' src='" + this.contact.loadedSrcForMap + "'</iframe>";
        this.iframeMapSafe = this.santizier.bypassSecurityTrustHtml(this.iframeMap);
      }
     },
     (error: HttpErrorResponse) => {
       console.log(error.message);
     }
     );
   }

  ngOnInit(): void {
  }
}

export class contact {
  contactDescription?: string;
  // Site to get SRC https://www.maps.ie/create-google-map/
  // https://maps.google.com/maps?width=720&amp;height=600&amp;hl=en&amp;q=Poznań%20Gdyńska%2010+(Workstonks)&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed
  loadedSrcForMap?: string;
}
