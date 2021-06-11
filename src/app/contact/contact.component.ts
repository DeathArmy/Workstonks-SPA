import { ConfigService } from './../services/config.service';
import { getUrlScheme } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contact = new contact;

  iframeMap;
  iframeMapSafe;

  constructor(private santizier: DomSanitizer, private contactConfig: ConfigService) {
    this.contactConfig.getConfig("contact").subscribe(contact => {
      contact = JSON.parse(<string>contact.data);
      //console.log(contact)
     });
    // this.contactConfig.postConfig(this.contact, 'contact').subscribe(post => {
    //   console.log(post);
    // });

    this.iframeMap = "<iframe width='100%' height='600' frameborder='0' scrolling='no' marginheight='0' marginwidth='0' src='" + this.contact.loadedSrcForMap + "'</iframe>"
    this.iframeMapSafe = this.santizier.bypassSecurityTrustHtml(this.iframeMap);
   }

  ngOnInit(): void {
  }

}

export class contact {
  contactDescription = "<b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry.";
  //Site to get SRC https://www.maps.ie/create-google-map/
  loadedSrcForMap = "https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=pl&amp;q=Pozna%C5%84,%20Gdy%C5%84ska%2010/12+(Tutaj%20jeste%C5%9Bmy)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed";
}
