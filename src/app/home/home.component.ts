import { ConfigService } from './../services/config.service';
import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  hc: homeConfiguration = new homeConfiguration;

  images = [111, 24, 69].map((n) => `https://picsum.photos/id/${n}/900/500`);

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
  homeFirstLabel = "Label1";
  homeSecondLabel = "Label2";
  homeThirdLabel = "Label3";
  homeFisrtDescription = "Description1";
  homeSecondDescription = "Description2";
  homeThirdDescription = "Description3";
  homeFirstName = "Name1";
  homeFirstText = "<b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";
  homeFirstImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";
  homeSecondName = "Name2";
  homeSecondText = "<b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";
  homeSecondImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";
  homeThirdName = "Name3";
  homeThirdText = "<b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";
  homeThirdImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";
}
