module.exports = ( app ) => {
    const getVacancie = async () => {
       
        const vacanciesDb = await app.db('VAGAS').select();
        return vacanciesDb;
    }
    const getMyVacancies = async (IDUSER) => {
        const vacanciesDb = await app.db('INSCRICOES')
                                    .select()
                                        .join('VAGAS','INSCRICOES.IDVAGA','=','VAGAS.IDVAGA')
                                    .where( 'INSCRICOES.IDUSER','=',IDUSER);
        return vacanciesDb;
    }
    
    const subscriptionExists = async (IDUSER,IDVAGA) => {
        const userDb = await app.db('INSCRICOES')
            .select('*').andWhere({ IDUSER }).andWhere({ IDVAGA });
        return userDb;
    }
    const subscribe = async (IDUSER,IDVAGA) => {
       
        const result = await app.db('INSCRICOES')
            .insert({ IDUSER,IDVAGA });
        return result;
    }
    const deleteMyInscription = async (IDUSER,IDVAGA) => {
       
        const result = await app.db('INSCRICOES')
            .delete().where({ IDUSER,IDVAGA });
        return result;
    }

    return {    
        getVacancie,
        subscribe,
        subscriptionExists,
        getMyVacancies,
        deleteMyInscription
    }
}