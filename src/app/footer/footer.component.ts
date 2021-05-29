import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  parentMessage:string = "";
  myMessageToParent="New message through Event Emitter";
  @Input() fromParent:any;

  @Output() newEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    this.parentMessage = "I am from the child component";
  }

  sendData() {
    this.newEvent.emit(this.myMessageToParent);
  }


}
