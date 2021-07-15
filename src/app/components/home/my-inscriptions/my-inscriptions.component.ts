import { DecimalPipe, LowerCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Vacancies } from 'src/app/models/vacancies';
import { VacanciesService } from 'src/app/services/vacancies/vacancies.service';
import { AvailableVacanciesComponent } from '../../available-vacancies/available-vacancies.component';
import { DetailsVacancieComponent } from '../../available-vacancies/details-vacancie/details-vacancie.component';
import { LoadingComponent } from '../../loading/loading.component';

@Component({
  selector: 'app-my-inscriptions',
  templateUrl: './my-inscriptions.component.html',
  styleUrls: ['./my-inscriptions.component.scss'],
  providers:[DecimalPipe, LowerCasePipe, DetailsVacancieComponent]
})
export class MyInscriptionsComponent extends AvailableVacanciesComponent implements OnInit {
  idUser = this.userStorage.getId();
  
  constructor(
    protected decimalPipe: DecimalPipe,
    protected lowerCasePipe:LowerCasePipe,
    protected vacancieService: VacanciesService,
    protected ngbModal:NgbModal
  ) {
    super(decimalPipe, lowerCasePipe,vacancieService, ngbModal);
   }

  ngOnInit(): void {
    this.getMyInscriptions();
  }
  getMyInscriptions(){
    const loading = this.ngbModal.open(LoadingComponent, { size:'sm' ,centered:true, backdrop:'static', keyboard:false });
    if(!this.idUser) return alert('ERRO!\n\nFalha no sistema\nExperiemente fazer login novamente.');
    this.vacancieService.getMyInscriptions(this.idUser)
      .subscribe(
        (result:Vacancies[]) => {
          this.vacanciesDb = result;
          this.filterTable();
          loading.close();
      },
      (error:any) => {
        alert('ERRO!\n\nFalha na rede\nTente novamente mais tarde.')
        loading.close();
      })
  }
  deleteMyInscription(vacancie:Vacancies){
    const loading = this.ngbModal.open(LoadingComponent, { size:'sm' ,centered:true, backdrop:'static', keyboard:false });
    if(!this.idUser) return alert('ERRO!\n\nFalha no sistema\nExperiemente fazer login novamente.');
    this.vacancieService.deleteMyInscription(this.idUser,vacancie.IDVAGA)
      .subscribe(
        (result:Vacancies[]) => {
          this.getMyInscriptions();
          loading.close();
        },
      (error:any) => {
        loading.close();
        alert('ERRO!\n\nFalha na rede\nTente novamente mais tarde.')
      })
  }
  

}
