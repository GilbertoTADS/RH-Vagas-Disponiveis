import { ExperienceUser } from "src/app/models/experience-user";
import { UserDbFull } from "src/app/models/user-bd-full";

export class ExperienceStorage{
    constructor(){}
    createObj(user: UserDbFull):ExperienceUser{
        return <ExperienceUser>{
            nameBussiness:user.EMPRESA,
            dateInited:user.DTINICIO.length > 0 ? user.DTINICIO.toString().substring(0,10):null,
            dateFinal:user.DTSAIDA.length > 0 ? user.DTSAIDA.toString().substring(0,10):null,
            office:user.CARGO,
            describe:user.ATRIBUICOES
          }
    }
    isSet():boolean{
        return sessionStorage.getItem('register-user-experiences') !== null;
    }
    isDuplicated(experienceOld:ExperienceUser[],experience:ExperienceUser):boolean{
        let result:boolean = false;
        experienceOld.forEach((obj:ExperienceUser) => {
            if( obj.dateFinal == experience.dateFinal &&
                obj.dateInited == experience.dateInited &&
                obj.describe == experience.describe &&
                obj.nameBussiness == experience.nameBussiness &&
                obj.office == experience.office
            ) result = true; 
        })
        return result;
    }
    add(experience:ExperienceUser):boolean{
        if(!this.get()) this.set([]);
        const experienceStorage = this.get();
        if(!experienceStorage) return false;
        experienceStorage.push(experience);
        this.set(experienceStorage);
        return true
    }
    set(experience:ExperienceUser[]):void{
        sessionStorage.setItem('register-user-experiences', JSON.stringify(experience));
    }
    getInString():ExperienceUser[]|null{
        return <ExperienceUser[]|null>sessionStorage.getItem('register-user-experiences');
    }
    get():ExperienceUser[]|void{
        let experience:string|null|ExperienceUser[] = <string|null>sessionStorage.getItem('register-user-experiences');
        if(experience === null) return; 
        experience = <ExperienceUser[]>JSON.parse(experience);
        return experience
    }
    clear():void{
        sessionStorage.removeItem('register-user-experiences');
    }
}