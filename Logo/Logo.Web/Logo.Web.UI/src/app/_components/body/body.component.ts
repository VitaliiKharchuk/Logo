import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})

export class BodyComponent implements OnInit {
   private bodyText: string;

   constructor() {
   }

   ngOnInit() {
       this.bodyText = 'This text can be updated in modal 1';
   }

}