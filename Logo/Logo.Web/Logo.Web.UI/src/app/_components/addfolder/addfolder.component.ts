import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';

import { AuthentificationService } from '../../_services/index';

@Component({
  selector: 'app-addfolder',
  templateUrl: './addfolder.component.html',
  styleUrls: ['./addfolder.component.css']
})
export class AddfolderComponent implements OnInit {
  @ViewChild('closeBtn') closeBtn: ElementRef;
  model: any = {};
  loading = false;
  constructor(private authentificationService: AuthentificationService) { }

  ngOnInit() {
  }

  createfolder() {
    this.loading = true;
    this.authentificationService.post('/api/folders/create-folder', this.model.foldername)
      .subscribe(
      data => {
        console.log('Creating folder successfull');
        this.closeModal();
        
        //refresh folder info loadAllFolders()
      },
      error => {
        //show info about error
        console.log('Cant create folder');
        this.loading = false;
      });

  }

  ngOnDestroy() {
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }

}
