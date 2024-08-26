import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-footer-page',
  templateUrl: './footer-page.component.html',
  styleUrls: [
    './footer-page.component.scss', 
    './footer-page.component.scss'
  ]
})
export class FooterPageComponent implements OnInit {

  constructor(){}

  ngOnInit(): void {
  }

  ngNavigate(url: string){
    window.open(url, 'blank');
  }

}
