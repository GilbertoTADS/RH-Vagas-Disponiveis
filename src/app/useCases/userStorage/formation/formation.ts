import { FormationUser } from "src/app/models/formation-user";
import { UserDbFull } from "src/app/models/user-bd-full";

export class FormationStorageUser{
    constructor(){}
    createObj(user: UserDbFull):FormationUser{
        return <FormationUser>{
            typeFormation:user.TIPOFORMACAO || 'U',
            institution:user.INSTITUICAO || '',
            nameOfCourse:user.CURSO || '',
            courseFinished:user.FLAGCONCLUIDO || '',
            dateConclusion:user.DTCONCLUSAO.length > 0 ? user.DTCONCLUSAO.toString().substring(0,10):null,
            dateInited:user.DTINICIO.length > 0 ? user.DTINICIO.toString().substring(0,10):null,
            dateFinal:user.DTCONCLUSAO.length > 0 ? user.DTCONCLUSAO.toString().substring(0,10):null,
          }
    }
    isSet():boolean{
        return sessionStorage.getItem('register-user-formation') !== null;
    }
    isEquals(formationOld:FormationUser, formation:FormationUser):boolean{
        return(
            (formationOld.institution != formation.institution)
            &&(formationOld.nameOfCourse != formation.nameOfCourse)
            )
    }
    set(formation:FormationUser[]):void{
        sessionStorage.setItem('register-user-formation', JSON.stringify(formation));
    }
    add(formation:FormationUser):boolean{
        if(!this.get()) this.set([]);
        const formationStorage = this.get();
        if(!formationStorage) return false;
        formationStorage.push(formation);
        this.set(formationStorage);
        return true
    }
    getInString():FormationUser[]|null{
        return <FormationUser[]|null>sessionStorage.getItem('register-user-formation');
    }
    get():FormationUser[]|void{
        let formation:string|null|FormationUser[] = <string|null>sessionStorage.getItem('register-user-formation');
        if(formation === null) return; 
        formation = <FormationUser[]>JSON.parse(formation)
        return formation;
    }
    clear():void{
        sessionStorage.removeItem('register-user-formation');
    }
}