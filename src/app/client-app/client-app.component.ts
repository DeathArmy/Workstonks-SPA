import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-app',
  templateUrl: './client-app.component.html',
  styleUrls: ['./client-app.component.css']
})
export class ClientAppComponent implements OnInit {

  constructor(private router: Router) {
    if (!router.url.includes('tracking?')) router.navigate(['/home']);
  }

  ngOnInit(): void {
  }

}
