import { AddressUser } from 'src/app/models/address-user';
import { ContactUser } from 'src/app/models/contact-user';
import { ExperienceUser } from 'src/app/models/experience-user';
import { FormationUser } from 'src/app/models/formation-user';
import { User } from 'src/app/models/user';
import { UserStorage } from 'src/app/models/user-storage';

export class UserUseCase{
  
    constructor(){}
    createObjUser(user:UserStorage[],formation:FormationUser[]|null,experience:ExperienceUser[]|null):User{
        let userValid:any;
        userValid = user ? JSON.parse(user.toString()) : {};
        userValid[0].identifier = userValid[0].identifier.toString().replace(/\./g,'').replace(/\-/g,'');
        userValid[0].formation = formation ? <FormationUser[]>JSON.parse(formation.toString()) : undefined;
        userValid[0].experience = experience ? <ExperienceUser[]>JSON.parse(experience.toString()) :undefined;
        userValid[0].contact = <ContactUser>{
          email:userValid[0].email,
          cell:userValid[0].cell,
          cellMessage:userValid[0].cellMessage,
          urlLinkedin:userValid[0].urlLinkedin
        }
        userValid[0].address = <AddressUser>{ 
          cep:userValid[0].cep,
          street:userValid[0].street.toUpperCase(),
          homeNumber:userValid[0].homeNumber,
          district:userValid[0].district.toUpperCase(),
          city:userValid[0].city.toUpperCase(),
          state:userValid[0].state
        };
        return <User>userValid[0];
    }
    
}