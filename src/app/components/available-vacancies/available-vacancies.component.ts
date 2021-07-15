import { Component, OnInit, OnChanges,PipeTransform } from '@angular/core';
import { DecimalPipe, LowerCasePipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Vacancies } from './../../models/vacancies';
import { VacanciesService } from './../../services/vacancies/vacancies.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailsVacancieComponent } from './details-vacancie/details-vacancie.component';
import { UserStorageUseCase } from 'src/app/useCases/userStorage/user-storage';
import { LoadingComponent } from './../loading/loading.component';




@Component({
  selector: 'app-available-vacancies',
  templateUrl: './available-vacancies.component.html',
  styleUrls: ['./available-vacancies.component.scss'],
  providers:[DecimalPipe, LowerCasePipe, DetailsVacancieComponent]
})
export class AvailableVacanciesComponent implements OnInit, OnChanges {
  vacanciesDb: Vacancies[] = [];
  vacancie$!: Observable<Vacancies[]>;
  vacanciePagination:Vacancies[] = [];
  filter = new FormControl('');
  userStorage = new UserStorageUseCase();
  constructor(
    protected decimalPipe: DecimalPipe,
    protected lowerCasePipe:LowerCasePipe,
    protected vacancieService: VacanciesService,
    protected ngbModal:NgbModal
    ) { 
      
  }
  ngOnChanges():void{
    
  }
  ngOnInit(): void {
    this.getVacanciesAvailable();
  }
  filterTable():void{
    this.vacancie$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text, this.decimalPipe, this.lowerCasePipe))
    );
  }
  getVacanciesAvailable():void{
    const loading = this.ngbModal.open(LoadingComponent, { size:'sm' ,centered:true, backdrop:'static', keyboard:false });
    this.vacancieService.getVacancies()
      .subscribe(
        (result:Vacancies[]) => {
          this.vacanciesDb = result;
          this.filterTable();
          loading.close();
        },
        (error:any) => {
          alert('ERRO!\n\nFalha na rede\nTente novamente mais tarde.');
          loading.close();
        })
  }
  search(text: string, decimalPipe: PipeTransform, lowerCasePipe: PipeTransform): Vacancies[] {
    const result = this.vacanciesDb.filter(vacancieTable => {
      const term = text.toLowerCase();
      return vacancieTable.DESCRICAO.toLowerCase().includes(term)
          || lowerCasePipe.transform(vacancieTable.UNIDADE).includes(term)
          || decimalPipe.transform(vacancieTable.QUANTIDADE).includes(term);
    });
    if(result.length > 0) return result;
    else return this.vacanciesDb;
  }
  openDetails(vacancie:Vacancies):void{
    const modal = this.ngbModal.open(DetailsVacancieComponent, { centered:true,size:'lg',scrollable:true });
    modal.componentInstance.vacancie = vacancie;
  }
  subscribeMe(vacancie:Vacancies):void{
    const idUser = this.userStorage.getId()
    
    if(!idUser) return alert('\nFaça login para se inscrever!\n');
    this.vacancieService.subscribeMe(idUser,vacancie.IDVAGA)
      .subscribe( 
        (result:any) => {
          if(result.message == 'user only subscribed') return alert('Você já está inscrito nesta vaga.');
          alert('SUCESSO!\n\nInscrição realizada!')
        },
        error => alert('ERRO!\n\nFalha na rede\nTente novamente mais tarde.'));
  }

}
