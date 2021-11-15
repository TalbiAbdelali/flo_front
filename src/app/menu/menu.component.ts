import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../service/auth-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router : Router, private authService : AuthServiceService) { }

  ngOnInit(): void {
    /*this.authService.testGetWithToken().subscribe(
      data => console.log(data),
      err =>  {
        console.log(err);
        alert("Only admin can access to this page");
        this.router.navigate(['home'], {queryParams: { registered: 'true' } });
      }
    );*/
  }

}
