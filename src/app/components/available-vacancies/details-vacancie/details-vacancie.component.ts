import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Vacancies } from 'src/app/models/vacancies';

@Component({
  selector: 'app-details-vacancie',
  templateUrl: './details-vacancie.component.html',
  styleUrls: ['./details-vacancie.component.scss']
})
export class DetailsVacancieComponent implements OnInit {
  
  @Input()vacancie?:Vacancies;
  constructor(
    private ngbModal:NgbModal,
    private modal:NgbActiveModal
  ) { }

  ngOnInit(): void {}
  close():void{
    this.modal.close();
  }

}
