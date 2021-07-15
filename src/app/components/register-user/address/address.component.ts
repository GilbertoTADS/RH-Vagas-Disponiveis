import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterUserComponent } from '../register-user.component';
import { RegisterService } from '../../../services/register-user/register.service';
import { ViaCepService } from '../../../services/via-cep/via-cep.service'
import { ViaCEP } from 'src/app/models/viaCep';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent extends RegisterUserComponent implements OnInit, OnChanges {
  messageErrorCEP?:string = '';
  constructor(
    protected registerUser:RegisterService,
    private viaCep:ViaCepService,
    protected router:Router,
    protected ngbModal:NgbModal
    ) { 
    super(registerUser,router,ngbModal);
  }

  ngOnInit(): void {
    this.start()
  }
  ngOnChanges():void{
    this.getChanges();
  }
  getAddressByCep(cep:string):void{
    if(cep.replace(/[^A-Za-z]/g,'').length > 8) return;
    this.viaCep.getAddressByCep(cep)
      .subscribe(
        e => {  
          if(!this.getAddressError(e)) return;
          this.authForm.get('street')!.setValue(e.logradouro)
          this.authForm.get('city')!.setValue(e.localidade)
          this.authForm.get('district')!.setValue(e.bairro)
          this.authForm.get('state')!.setValue(e.uf)
          console.log(e)},
        e => this.messageErrorCEP = 'CEP não encontrado, preencha os campos manualmente')
  }
  getAddressError(address:ViaCEP):boolean{
    if(address.erro === true) {
      this.messageErrorCEP = 'CEP não encontrado, preencha os campos manualmente'
      setTimeout(() => {
        this.messageErrorCEP = undefined;
      },5000)
      return false
    } 
    return true
  }

}
