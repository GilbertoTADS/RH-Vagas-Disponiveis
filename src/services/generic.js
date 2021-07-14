module.exports = ( app ) => {
    const getAll = async () => {
        const user = await app.db('USUARIO')
            .select()
                .join('FORMACAO', 'FORMACAO.IDUSER','=','USUARIO.IDUSER')
                .join('EXPERIENCIA', 'EXPERIENCIA.IDUSER','=','USUARIO.IDUSER')
                .join('ENDERECO', 'ENDERECO.IDUSER','=','USUARIO.IDUSER')
        return user;
    }
    return {
        getAll
    }
}