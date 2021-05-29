import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  result:any;
  resultData:any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  getData() {
    let url = "https://api.github.com/search/repositories?q=tetris+language:angular";
    this.http.get(url).subscribe(response => {
      this.result = response;
      this.resultData = this.result.items;
    })
  }
}
