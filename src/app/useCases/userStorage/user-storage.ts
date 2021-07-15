import { UserDbFull } from 'src/app/models/user-bd-full';
import { UserStorage } from './../../models/user-storage';

export class UserStorageUseCase{
    
    constructor(){}
    createObj(user: UserDbFull):UserStorage{
        return <UserStorage>{
            maritalStatus:user.ESTADOCIVIL,
            identifier:user.CPFCNPJ,
            fullName:user.NOME,
            birthDate:user.DTNASCIMENTO.length > 0 ? user.DTNASCIMENTO.toString().substring(0,10):null,
            sex:user.SEXO,
            email:user.EMAIL,
            cell:user.CONTATO,
            cellMessage:user.RECADO,
            urlLinkedin:user.LINKEDIN,
            cep:user.CEP,
            street:user.LOGRADOURO,
            homeNumber:user.NUMERO,
            district:user.BAIRRO,
            city:user.CIDADE,
            state:user.ESTADO,
            stateBirth:user.UFNASCIMENTO,
            deficient:user.DEFICIENTE,
            presentation:user.APRESENTACAO,
            wage:user.PRETENSAOSALARIAL
          }
    }
    isSet():boolean{
         return sessionStorage.getItem('register-user') === null;
    }

    set(user:UserStorage):void{
        sessionStorage.setItem('register-user',JSON.stringify(Array(user)));
    }

    getId():string|void{
        const userIdStorage = sessionStorage.getItem('USER');
        if(userIdStorage === null) return;
        return userIdStorage;
    }

    getInString():UserStorage[]|null{
        return <UserStorage[]|null>sessionStorage.getItem('register-user');
    }

    get():UserStorage[]|void{
       const userStorage = sessionStorage.getItem('register-user');
       if(userStorage === null) return;
       const user = <UserStorage[]>JSON.parse(userStorage);
       return user;
    }

    clear(){
        sessionStorage.removeItem('register-user');
    }
}