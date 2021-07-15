import { Component, OnInit } from '@angular/core';
import { UserDbFull } from 'src/app/models/user-bd-full';
import { RegisterService } from 'src/app/services/register-user/register.service';
import { UserStorageUseCase } from 'src/app/useCases/userStorage/user-storage';

@Component({
  selector: 'app-my-credentials',
  templateUrl: './my-credentials.component.html',
  styleUrls: ['./my-credentials.component.scss']
})
export class MyCredentialsComponent implements OnInit {
  user:UserDbFull[] = [];
  email:string = 'Erro!';
  identifier:string = 'Erro!';
  userStorage = new UserStorageUseCase();
  constructor( private regiter:RegisterService ) { }

  ngOnInit(): void {
    this.getUser();
  }
  setCredentials(user:UserDbFull[]):void{
    this.email = this.user.length > 0 ? this.user[0].EMAIL : 'Erro!';
    this.identifier = this.user.length > 0 ? this.user[0].CPFCNPJ : 'Erro!';
    console.log(this.user)
  }
  getUser():void{
    const userStorage = this.userStorage.get();
    if(!userStorage) return;
    this.regiter.getUser(userStorage[0].identifier)
      .subscribe( 
        (user:UserDbFull[]) => {
          this.user = user;
          console.log(this.user,user  )
          this.setCredentials(this.user)
        },
        error => console.log(error)
      )
  }

}
