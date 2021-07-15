import { Component, OnInit, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Validations } from './../resources/helpers/validation-forms';
import { DateCustom } from './../resources/helpers/validation-date';
import { RegisterService } from './../../services/register-user/register.service';
import { UserStorage } from './../../models/user-storage';
import { FormationUser } from './../../models/formation-user';
import { User } from './../../models/user';
import { ExperienceUser } from 'src/app/models/experience-user';
import { LoadingComponent } from './../loading/loading.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserStorageUseCase } from './../../useCases/userStorage/user-storage';
import { UserUseCase } from './../../useCases/user/user';
import { FormationStorageUser } from 'src/app/useCases/userStorage/formation/formation';
import { ExperienceStorage } from 'src/app/useCases/userStorage/experience/experience';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit, OnChanges { 
  authFailed:boolean = false;
  validations = new Validations();
  dateCustom = new DateCustom();
  active:number = 1;
  userStorage:UserStorageUseCase = new UserStorageUseCase();
  formationStorage:FormationStorageUser = new FormationStorageUser();
  experienceStorage:ExperienceStorage = new ExperienceStorage();
  userUseCase:UserUseCase = new UserUseCase();
  authForm:FormGroup = new FormGroup({
    'identifier': new FormControl(null, [Validators.required,Validators.minLength(11), Validators.maxLength(14), Validators.pattern(/[\d]/g)]),
    'fullName': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    'birthDate': new FormControl(DateCustom.currentDate(), [Validators.required, this.isValidDate, this.dateMaxIsToday]),
    'sex': new FormControl('U'),
    'maritalStatus': new FormControl('U'),
    'email': new FormControl(null, [Validators.required,Validators.email]),
    'cell': new FormControl(null, [Validators.required,Validators.minLength(11)]),
    'cellMessage': new FormControl(null, [Validators.minLength(11)]),
    'urlLinkedin': new FormControl(null),
    'cep':new FormControl(null, [Validators.required, Validators.minLength(8),Validators.maxLength(8)], ),
    'street': new FormControl(null, [Validators.required, Validators.minLength(1)], ),
    'homeNumber': new FormControl(null, [Validators.required, Validators.minLength(1)], ),
    'district': new FormControl(null, [Validators.required, Validators.minLength(3)], ),
    'city': new FormControl(null, [Validators.required, Validators.minLength(2)], ),
    'state': new FormControl(null, [Validators.required, Validators.minLength(2),Validators.maxLength(2)], ),
    'stateBirth':new FormControl('U'),
    'deficient':new FormControl(null),
    'wage':new FormControl('0',[Validators.required]),
    'presentation':new FormControl(null),
  });
  formValid:boolean|null = null;
  wage:number = 0; 
  constructor(
    protected registerUser:RegisterService, 
    protected router:Router,
    protected ngbModal:NgbModal
  ) {}

  ngOnInit(): void {
    this.start();
  }

  ngOnChanges():void{
    this.getChanges();
  }

  isValidDate(c:FormControl){
    const DATE_REGEXP = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    return DATE_REGEXP.test(c.value) || c.value === '' ? null : {
      validateEmail: {
        valid: false
      }
    };
  }

  dateMaxIsToday(c:FormControl){
    return Date.parse(c.value) < Date.parse(DateCustom.currentDate()) ? null : {
      validateEmail: {
        valid: false
      }
    };
    
  }

  protected start():void{
    this.getChanges()
    this.saveChanges()
  }

  private saveChanges():void{
    this.authForm.valueChanges.subscribe( (e:UserStorage) => {
      sessionStorage.setItem('form-register-user-valid',this.authForm.valid.toString())
      this.userStorage.set(e)
      this.formValid = <boolean|null>sessionStorage.getItem('form-register-user-valid')
    })
  }

  protected getChanges():void{
    let registerStorage = <string|null>sessionStorage.getItem('register-user');
    if(registerStorage === null ) return;
    this.authForm.markAllAsTouched()
    let registerJSON = JSON.parse(registerStorage);
    this.authForm.setValue(registerJSON[0]);
  }

  userInStorageIsValid():string|void { 
    let user = <UserStorage[]|null>sessionStorage.getItem('register-user');
    if(!user) return alert('preencha os campos obrigatórios dos dados pessoais para continuar');
    user = JSON.parse(user.toString());
    if(!user![0].identifier) return alert('CPF OU CNPJ é um campo obrigatório');
    const identifier = user![0].identifier.toString().replace(/\./g,'').replace(/\-/g,'');
    const sizeCPF = 11;
    const sizeCNPJ = 14;
    if(identifier.length != sizeCPF && identifier.length != sizeCNPJ) return alert('O campo CPF OU CNPJ está inválido');
    if(!user![0].fullName) return alert('Nome completo é um campo obrigatório');
    if(!user![0].birthDate) return alert('Data de Nascimento é um campo obrigatório');

    if(!user![0].cep) return alert('CEP é um campo obrigatório');
    if(!user![0].street) return alert('Rua é um campo obrigatório');
    if(!user![0].homeNumber) return alert('Nº é um campo obrigatório');
    if(!user![0].district) return alert('Bairro é um campo obrigatório');
    if(!user![0].city) return alert('Cidade é um campo obrigatório');
    if(!user![0].state) return alert('Estado é um campo obrigatório');
    if(user![0].state.length !== 2) return alert('O campo ESTADO está inválido');
    if(!user![0].email) return alert('Email é um campo obrigatório');
    if(!user![0].cell) return alert('Contato é um campo obrigatório');
    if(!user![0].wage) return alert('O campo PRETENÇÃO SALARIAL está inválido')
    return 'OK';
  }

  formationInStorageValid():string|void{
    let formation = this.formationStorage.get();
    if(formation === undefined) return 'OK';
    formation.forEach( (formation,idx) => {
      if(formation.dateConclusion.length != 10) return alert ('O campo Prev.conclusão está inválido');
      if(formation.dateFinal.length != 10) return alert ('O campo Data final está inválido');
      if(formation.dateInited.length != 10) return alert ('O campo Data inicial está inválido');
    })
    return 'OK';
  }

  experienceInStorageValid():string|void{
    let experience = this.experienceStorage.get();
    if(experience === undefined) return 'OK';
    experience.forEach( (experience,idx) => {
      if(experience.dateInited.length != 10) return alert ('O campo Início está inválido');
      if(experience.dateFinal.length != 10) return alert('O campo Saída está inválido')
      if(experience.office.length < 3) return alert ('Mínimo de 3 caracteres para o campo Cargo');
      if(experience.nameBussiness.length < 3) return alert ('Mínimo de 3 caracteres para o campo Empresa');
    })
    return 'OK';
  }

  register():void {
    
    const loading =  this.ngbModal.open(LoadingComponent, { size:'sm' ,centered:true, backdrop:'static', keyboard:false });
    this.authForm.markAllAsTouched()
    if(this.userInStorageIsValid() !== 'OK') return loading.close();
    const user = <UserStorage[]|null>sessionStorage.getItem('register-user');
    console.log('register');
    if(this.formationInStorageValid() !== 'OK') return loading.close();
    const formation = <FormationUser[]|null>sessionStorage.getItem('register-user-formation');
    if(this.experienceInStorageValid() !== 'OK') return loading.close();
    const experience = <ExperienceUser[]|null>sessionStorage.getItem('register-user-experiences');
  
    let userValid:User = this.userUseCase.createObjUser(<UserStorage[]>user,formation,experience);
    
    this.registerUser.registerUser(userValid)
      .subscribe( 
        result => {  
          this.verifyResultRegister(result);
          loading.close();
        },
        error => {
          loading.close();
          alert('ERRO!\n\nFalha na rede\nTente novamente mais tarde.');
        }
        );
  }
  
  verifyResultRegister(result:any){
    if(result.error == false && result.message == 'user already exist') return alert('Usuário já cadastrado!\n\n EMAIL ou IDENTIFICADOR já registrado')
    sessionStorage.setItem('USER',result[0].IDUSER);
    alert('Cadastro realizado com sucesso!\nVamos Logar!');
    this.router.navigateByUrl('/home');
  }
  

}
