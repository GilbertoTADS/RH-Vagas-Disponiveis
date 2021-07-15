import { ContactUser} from './contact-user'
import { AddressUser } from './address-user'
import { ExperienceUser } from './experience-user'
import { FormationUser } from './formation-user'

export interface User {
    identifier:string;
    password:string;
    fullName:string;
    birthDate:string;
    sex:string;
    presentation:string;
    maritalStatus:string;
    stateBirth:string;
    deficient:string;
    contact:ContactUser;
    address:AddressUser;
    experiences:ExperienceUser[];
    formations:FormationUser[];

}
