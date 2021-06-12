import { ConfigService } from '../../services/config.service';
import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

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
      let tempSP: homeConfiguration = JSON.parse(<string>home.data);
      this.hc = tempSP;
      //console.log(this.hc);
     });

    // this.configS.postConfig(this.hc, 'home').subscribe(post => {
    //   console.log(post);
    // });
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
