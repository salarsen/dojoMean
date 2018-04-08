import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-supersaiyan',
  templateUrl: './supersaiyan.component.html',
  styleUrls: ['./supersaiyan.component.css']
})
export class SupersaiyanComponent implements OnInit, OnChanges {

  @Input() powerLevel;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    this.powerLevel = this.powerLevel * 90;
  }

}
