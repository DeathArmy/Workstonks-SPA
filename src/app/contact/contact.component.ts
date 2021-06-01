import { getUrlScheme } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactDescription = "<b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry.";

  //Site to get SRC https://www.maps.ie/create-google-map/
  loadedSrcForMap = "https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=pl&amp;q=Pozna%C5%84,%20Gdy%C5%84ska%2010/12+(Tutaj%20jeste%C5%9Bmy)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed";
  iframeMap;
  iframeMapSafe;

  constructor(private santizier: DomSanitizer) {
    this.iframeMap = "<iframe width='100%' height='600' frameborder='0' scrolling='no' marginheight='0' marginwidth='0' src='" + this.loadedSrcForMap + "'</iframe>"
    this.iframeMapSafe = this.santizier.bypassSecurityTrustHtml(this.iframeMap);
   }

  ngOnInit(): void {
  }

}
