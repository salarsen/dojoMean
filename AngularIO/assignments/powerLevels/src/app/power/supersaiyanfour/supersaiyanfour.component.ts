import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-supersaiyanfour',
  templateUrl: './supersaiyanfour.component.html',
  styleUrls: ['./supersaiyanfour.component.css']
})
export class SupersaiyanfourComponent implements OnInit, OnChanges {

  @Input() powerLevel;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    this.powerLevel = this.powerLevel * 500;
  }

}
