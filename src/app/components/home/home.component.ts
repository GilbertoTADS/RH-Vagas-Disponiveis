import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/register-user/register.service';
import { UserStorageUseCase } from './../../useCases/userStorage/user-storage';
import { UserUseCase } from './../../useCases/user/user';
import { FormationStorageUser } from 'src/app/useCases/userStorage/formation/formation';
import { ExperienceStorage } from 'src/app/useCases/userStorage/experience/experience';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { UserDbFull } from 'src/app/models/user-bd-full';
import { LoadingComponent } from './../loading/loading.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public isCollapsed = false;
  greeting:string = ''
  active:number = 0;
  userStorage = new UserStorageUseCase();
  userUseCase:UserUseCase = new UserUseCase();
  formationStorage:FormationStorageUser = new FormationStorageUser();
  experienceStorage:ExperienceStorage = new ExperienceStorage();
  constructor(
    private register:RegisterService,
    private router: Router,
    private ngbModal:NgbModal
  ) { }

  ngOnInit(): void {
    this.isAuthenticated();
    this.showGreetingIfExists()
  }
  showGreetingIfExists():void{
    const user = this.userStorage.get();
    if(!user) return;
    const nameUser = user[0].fullName.toString().split(' ')[0];
    this.greeting = `Olá, ${nameUser}!`;
  }
  exit(){
    sessionStorage.clear();
    this.router.navigateByUrl(`/login`); 
  }
  updateUser():void{
    const loading = this.ngbModal.open(LoadingComponent, { size:'sm' ,centered:true, backdrop:'static', keyboard:false });
    const idUser = this.userStorage.getId();
    let user = this.userStorage.getInString();
    const formation = this.formationStorage.getInString();
    const experience = this.experienceStorage.getInString();
    if(idUser !== undefined && user){
      const userValid:User = this.userUseCase.createObjUser(user,formation||null,experience||null);
      this.register.updateUser(idUser,userValid)
        .subscribe( 
          (user:UserDbFull[]) => {
            alert('SUCESSO!\n\nDados atualizados!')
            loading.close(); 
          }, 
          error => {
            alert('ERRO\n\nSeus dados não foram salvos!')
            loading.close(); 
            
          }
        );
      return;
    }
    loading.close(); 
    return alert('HÁ ALGO ERRADO NA REDE!\n\nExperimente sair a fazer login novamente\n\nEssas alterações não foram salvas');
  }
  isAuthenticated():void {
    if(!sessionStorage.getItem('USER')) this.router.navigateByUrl(`/login`);    
  }


}
