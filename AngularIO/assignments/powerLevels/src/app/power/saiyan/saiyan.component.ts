import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-saiyan',
  templateUrl: './saiyan.component.html',
  styleUrls: ['./saiyan.component.css']
})
export class SaiyanComponent implements OnInit, OnChanges {

  @Input() powerLevel;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    this.powerLevel = this.powerLevel*10;
  }

}
