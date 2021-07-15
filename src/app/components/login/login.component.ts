import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../services/authentication/authentication.service'
import { ApiService } from 'src/app/services/api.service';
import { Validations } from './../resources/helpers/validation-forms';
import { LoadingComponent } from './../loading/loading.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserDbFull } from 'src/app/models/user-bd-full';
import { SessionUseCase } from './../../useCases/session/session';
import { AvailableVacanciesComponent } from './../available-vacancies/available-vacancies.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit { 
  authForm:FormGroup = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'password': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)])
  });
  authFailed:boolean = false;
  validations = new Validations();
  sessionUseCase = new SessionUseCase();
  componentVacancies = AvailableVacanciesComponent;
  constructor(
    private authenticate: AuthenticationService,
    private router: Router,
    private api: ApiService,
    private ngbModal:NgbModal
  ) {}

  ngOnInit(): void {
    this.isLogged();
  }
  auth():void{
    if(this.authForm.valid) this.login();
  }
  onlyNumber(inputFormValue:HTMLInputElement,nameInput:string):void{
    this.authForm.get(nameInput)?.setValue(inputFormValue.value.toString().replace(/[^\d]/g,''));
  }
  login():void{
    const loading = this.ngbModal.open(LoadingComponent, { size:'sm' ,centered:true, backdrop:'static', keyboard:false });
    this.authenticate.login(
      this.authForm.get('email')!.value,
      this.authForm.get('password')!.value
      )
      .subscribe( (user:UserDbFull[]) => {
        if(user.length > 0) {
          this.sessionUseCase.createSession(user[0]); 
          this.sessionUseCase.setExperience(user);
          this.sessionUseCase.setFormation(user); 
          this.loginSuccess(user[0]);
          loading.close();
        }
        else this.loginError();
      }, (error:any) => {
        console.log(error); 
        loading.close();
        alert('ERRO!\n\nFalha na rede\nTente novamente mais tarde.');
      })
      
  }
  loginSuccess(user:UserDbFull):void {
    this.router.navigateByUrl(`/home`);    
  }
  loginError():void{
    this.ngbModal.dismissAll();
    this.authFailed = true;
    setTimeout(() => {
      this.authFailed = false;
    },3000);    
  }
  isLogged(){
    if(sessionStorage.getItem('USER')) this.router.navigateByUrl(`/home`);
  }
}