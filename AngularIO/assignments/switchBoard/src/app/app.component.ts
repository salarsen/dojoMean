import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  switchboard = ['on','off','on','on','off','on','off','off','off','on'];

  swapIt(index){
    console.log('swapping',index);
    if(this.switchboard[index] === 'on'){
      this.switchboard[index] = 'off';
    } else {
      this.switchboard[index] = 'on';
    }
  }
}
