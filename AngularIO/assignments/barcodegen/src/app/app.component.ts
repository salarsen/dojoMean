import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  colorChoices : string[] = ['Aqua','Brown','Cyan','BlueViolet','DarkGreen','DarkGoldenRod','DeepPink'];

  colors : string[] = [];
  
  printColor() {
    for(let x = 0; x < 10; x++){
      const randomNum = (Math.floor(Math.random()*7)) + 0;
      this.colors.push(this.colorChoices[randomNum]);
    }
  }

  ngOnInit() {
    this.printColor();
  }
}
