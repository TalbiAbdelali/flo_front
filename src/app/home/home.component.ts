import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../service/auth-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authServie : AuthServiceService) { }

  ngOnInit(): void {
  }

  /*displayList() {
    this.authServie.getShopList().subscribe(result => {
      console.log("home.com:", result);
  })
  }*/

}
