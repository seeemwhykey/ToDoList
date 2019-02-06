import { Component, OnInit } from '@angular/core';
import { DataService } from '../../_service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-template-header',
  templateUrl: './template-header.component.html',
  styleUrls: ['./template-header.component.sass']
})
export class TemplateHeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  doLogout() {
    this.router.navigate(['login']);
  }


}
