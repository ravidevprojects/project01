import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'project01';
  footerMessage = "I am from the parent component.";
  receiveData:string="";

  dataToReceive($event:any){
    this.receiveData = $event
}
}