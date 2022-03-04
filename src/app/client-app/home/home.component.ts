import { ConfigService } from '../../services/config.service';
import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  hc: homeConfiguration = new homeConfiguration;

  images: Array<string> = [
    "https://pixabay.com/get/gd3c8e4ac3e12bb67f3f8b576490bcf7ad8ac060f62f05d284fbf3c693640cc3c2d4953823b4acebe842f12e0f16ed957477c7c73e41419a1db93f6e95c1ebbcd584064aaa8b52c10e2ed635480f7d343_1920.jpg",
    "https://pixabay.com/get/ga19ba6865bfaf529d532b0c98734d43aab4bdbeeb68d6d477e5a023b03a3bb28503e1ed6908af7fd2024b662f5b866ecdb315666a6564c6ff8a5a86cadcbe3a9761b3bf90b7d2f3e25792725ebeffb80_1920.jpg",
    "https://pixabay.com/get/g21278563239f340832bc35b4765e66a01338a079216e1213b54612aa1a4e5feed4edfd88f81f7e79e4946d40ad385a12016eea6be11027e3284fdf4cc603194ab0de4930798595a463ea64ff0f2d0b22_1920.jpg"
  ];

  constructor(private config: NgbCarouselConfig, private configS: ConfigService) {

    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;

    this.configS.getConfig("home").subscribe(home => {
      if (home == null) {
        console.log("Brak konfiguracji dla Home.");
      }
      else {
        let tempSP: homeConfiguration = JSON.parse(<string>home.data);
        this.hc = tempSP;
      }
     },
     (error:HttpErrorResponse) => {
      console.log(error.message);
     });
   }

  ngOnInit(): void {
  }

}

export class homeConfiguration {
  homeFirstLabel?: string;
  homeSecondLabel?: string;
  homeThirdLabel?: string;
  homeFisrtDescription?: string;
  homeSecondDescription?: string;
  homeThirdDescription?: string;
  homeFirstName?: string;
  homeFirstText?: string;
  homeFirstImg?: string;
  homeSecondName?: string;
  homeSecondText?: string;
  homeSecondImg?: string;
  homeThirdName?: string;
  homeThirdText?: string;
  homeThirdImg?: string;
}
