import { ConfigService } from '../../services/config.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

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
      this.contact = JSON.parse(<string>contact.data);
      this.iframeMap = "<iframe width='100%' height='600' frameborder='0' scrolling='no' marginheight='0' marginwidth='0' src='" + this.contact.loadedSrcForMap + "'</iframe>";
      this.iframeMapSafe = this.santizier.bypassSecurityTrustHtml(this.iframeMap);
      //console.log(this.contact);
     });
    // this.contactConfig.postConfig(this.contact, 'contact').subscribe(post => {
    //   console.log(post);
    // });

   }

  ngOnInit(): void {
  }
}

export class contact {
  contactDescription?: string;
  //Site to get SRC https://www.maps.ie/create-google-map/
  loadedSrcForMap?: string;
}
