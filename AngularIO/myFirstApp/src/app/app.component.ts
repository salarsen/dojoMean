import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // switch: boolean = true;
  num : number = 1;

  logNum(){
    console.log('The num is: ',this.num);
  }

  increaseNum(){
    this.num++;
  }
}
