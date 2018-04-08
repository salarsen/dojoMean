import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showTZ : boolean = false;
  timeZone = null;
  time = new Date();

  timeZoneFunc(target){
    this.time = new Date();
    if(target === 'MST'){
      this.time.setHours(this.time.getHours()+1);
    } else if (target === 'CST'){
      this.time.setHours(this.time.getHours()+2);
    } else if (target === 'EST'){
      this.time.setHours(this.time.getHours()+3);
    }
    this.timeZone = target;
  }

  clear(){
    this.timeZone = null;
  }

}
