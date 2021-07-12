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

  images = [1, 2, 3].map((n) => `https://picsum.photos/id/${n}/900/500`);

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
