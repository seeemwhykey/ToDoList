import { Component, OnInit } from '@angular/core';
import { DataService } from '../_service/data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  password: string;
  email: string;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
  }

  doLogin() {
    const loginData = {email: this.email, password: this.password};
    console.log(loginData);
    this.dataService.login(loginData);
    this.router.navigate(['home']);
  }

}
