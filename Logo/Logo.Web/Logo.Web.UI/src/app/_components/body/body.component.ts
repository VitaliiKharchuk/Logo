import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../_services/index';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})

export class BodyComponent implements OnInit {
   private bodyText: string;

   constructor(private modalService: ModalService) {
   }

   ngOnInit() {
       this.bodyText = 'This text can be updated in modal 1';
   }

   openModal(id: string){
       this.modalService.open(id);
   }

   closeModal(id: string){
       this.modalService.close(id);
   }
}