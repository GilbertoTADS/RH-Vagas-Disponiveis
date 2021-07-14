
module.exports = ( app ) => {
    const formatUser = (user) => {
        const dataFromUser = {
            NOME:user.fullName,
            DTNASCIMENTO :user.birthDate,
            CPFCNPJ:user.identifier,
            ESTADOCIVIL:user.maritalStatus,
            SEXO:user.sex,
            UFNASCIMENTO :user.stateBirth,
            DEFICIENTE:user.deficient,
            APRESENTACAO:user.presentation,
            EMAIL:user.contact.email,
            CONTATO:user.contact.cell,
            RECADO:user.contact.cellMessage,
            LINKEDIN :user.contact.urlLinkedin,
            FLAGATIVO:'S',
            PRETENSAOSALARIAL:user.wage||0.0
        }
        return dataFromUser;
    }
    const getUserByIdentifier = async ( CPFCNPJ, columns = [] ) => {
       
        const user = await app.db('USUARIO')
            .select(columns)
            .where({ CPFCNPJ });

        return user;
    }
    const getUser = async ( EMAIL,CPFCNPJ ) => {
        const user = await app.db('USUARIO')
            .select()
                .join('FORMACAO', 'FORMACAO.IDUSER','=','USUARIO.IDUSER')
                .join('EXPERIENCIA', 'EXPERIENCIA.IDUSER','=','USUARIO.IDUSER')
                .join('ENDERECO', 'ENDERECO.IDUSER','=','USUARIO.IDUSER')
            .where('CPFCNPJ',CPFCNPJ).andWhere( 'EMAIL',EMAIL);
        return user;
    }
    const getAdrress = async (IDUSER,addresFields = []) => {
        
        const addressDb = await app.db('ENDERECO')
            .select(addresFields)
            .where('IDUSER',IDUSER);
        return addressDb
    }
    const saveAdrress = async (idUser, address) => {
        const addressFromUser = {
            IDUSER:idUser,
            CEP:address.cep,
            LOGRADOURO:address.street  || ' ',
            NUMERO :address.homeNumber || ' ',
            BAIRRO :address.district   || ' ',
            CIDADE :address.city       || ' ',
            ESTADO :address.state      || ' ',
        }
        return await app.db('ENDERECO').insert(addressFromUser);
    }
    const updateUser = async (IDUSER, user) => {
        const dataFromUser = formatUser(user);
        return await app.db('USUARIO')
            .update(dataFromUser)
            .where({ IDUSER });
    }
    const getFormation = async (IDUSER,formationFields = []) => {
        
        const addressDb = await app.db('FORMACAO')
            .select(formationFields)
            .where('IDUSER',IDUSER);
        return addressDb
    }
    const saveFormation = async (idUser, formations) => {
        
        formations.forEach( async (formation, idx) => {
           
            const formationFromUser = {
                IDUSER: idUser, 
                INSTITUICAO:formation.institution,
                CURSO: formation.nameOfCourse,
                FLAGCONCLUIDO:formation.courseFinished,
                DTINICIO:formation.dateInited,
                DTCONCLUSAO:formation.dateFinal || formation.dateConclusion
            }
            await app.db('FORMACAO').insert(formationFromUser);
        });
    }
    const deleteFormation = async (IDUSER) => {
        const res = await app.db('FORMACAO').delete().where({ IDUSER });
        return res;
    }
    const deleteExperience = async (IDUSER) => {
        const res = await app.db('EXPERIENCIA').delete().where({ IDUSER });
        return res;
    }
    const deleteUser = async (IDUSER) => {
        const res = await app.db('USUARIO').delete().where({ IDUSER });
        return res;
    };
    const getExperience = async (IDUSER,ExperienceFields = []) => {
        
        const addressDb = await app.db('EXPERIENCIA')
            .select(ExperienceFields)
            .where('IDUSER',IDUSER);
        return addressDb
    }
    const saveExperience = async (idUser, experiences) => {
        
        experiences.forEach( async (experience, idx) => {
            
            const experienceFromUser = {
                IDUSER:idUser, 
                EMPRESA:experience.nameBussiness, 
                DTINICIO :experience.dateInited,
                DTSAIDA :experience.dateFinal,
                CARGO :experience.office,
                ATRIBUICOES :experience.describe
            }
            await app.db('EXPERIENCIA').insert(experienceFromUser);
        });
        
    }
    const saveUser = async (user) => {
        const dataFromUser = formatUser(user);
        await app.db('USUARIO').insert(dataFromUser);
        const userDb = await getUserByIdentifier(dataFromUser.CPFCNPJ);
        return userDb;
    }
    const userExists = async (CPFCNPJ,EMAIL) => {
        const userDb = await app.db('USUARIO').select('*').orWhere({ CPFCNPJ }).orWhere({ EMAIL });
        return userDb;
    }
    return { 
        saveUser, 
        getUser,
        getUserByIdentifier,
        userExists,
        saveAdrress,
        getAdrress,
        getFormation,
        saveFormation,
        deleteFormation,
        getExperience,
        saveExperience,
        deleteExperience,
        updateUser,
        deleteUser,
        
    }
}