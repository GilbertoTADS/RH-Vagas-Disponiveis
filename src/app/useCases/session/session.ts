import { UserDbFull } from 'src/app/models/user-bd-full';
import { UserStorage } from 'src/app/models/user-storage';
import { UserStorageUseCase } from './../../useCases/userStorage/user-storage';
import { FormationUser } from 'src/app/models/formation-user';
import { FormationStorageUser } from 'src/app/useCases/userStorage/formation/formation';
import { ExperienceStorage } from 'src/app/useCases/userStorage/experience/experience';
import { ExperienceUser } from 'src/app/models/experience-user';

export class SessionUseCase{
    userStorageUseCase = new UserStorageUseCase();
    formationStorageUseCase = new FormationStorageUser();
    experienceStorageUseCase = new ExperienceStorage();

    constructor(){}
    createSession(user:UserDbFull):void{
        sessionStorage.setItem('USER',user.IDUSER);
        let userStorage:UserStorage = this.userStorageUseCase.createObj(user);
        this.userStorageUseCase.set(userStorage);
    }
    setExperience(user:UserDbFull[]):void{
      let experience:ExperienceUser[] = []; 
      user.forEach( userCurrent => {
        const experienceNew = this.experienceStorageUseCase.createObj(userCurrent);
        if(!this.experienceStorageUseCase.isDuplicated(experience,experienceNew)){
          experience.push(experienceNew);
        }
      })
      this.experienceStorageUseCase.set(experience);
    }
    setFormation(user:UserDbFull[]):void{
      user.map( user => {
        const formation:FormationUser = this.formationStorageUseCase.createObj(user);
        if(!this.formationStorageUseCase.isSet()) return this.formationStorageUseCase.set([formation]);
        const formationOld = this.formationStorageUseCase.get();
        if(formationOld !== undefined){
          if(this.formationStorageUseCase.isEquals(formationOld[formationOld.length-1],formation)) 
            this.formationStorageUseCase.add(formation)
        }
      })
    }
}