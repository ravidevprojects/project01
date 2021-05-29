import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  result: any;
  resultData:any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    let url = "https://api.npms.io/v2/search?q=scope:angular";
    this.http.get(url).subscribe(response=> {
      console.log(response);
        this.result = response;
        this.resultData = this.result.results;
      }
    )
  }
}
