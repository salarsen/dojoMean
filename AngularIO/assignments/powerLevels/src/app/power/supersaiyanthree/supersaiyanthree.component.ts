import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-supersaiyanthree',
  templateUrl: './supersaiyanthree.component.html',
  styleUrls: ['./supersaiyanthree.component.css']
})
export class SupersaiyanthreeComponent implements OnInit, OnChanges {

  @Input() powerLevel;
  
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    this.powerLevel = this.powerLevel * 250;
  }
}
