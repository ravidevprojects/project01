import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  title:any;
  navItems:any;
  dateStarted : any;
  ngOnInit(): void {
    this.title ="Angular Experiments";
    this.dateStarted = Date();

    this.navItems = "Home"

    this.navItems = ["Projects", "ContactUs", "Assignments-TDF", "Contact-Form-RF", "GISForm", "Search"];
  }

}
