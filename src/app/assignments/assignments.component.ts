import { Component, OnInit } from '@angular/core';
import { country } from '../Models/assignments-model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {

  countryList: country | undefined

  constructor() {

  }

  ngOnInit(): void {
  }

}
