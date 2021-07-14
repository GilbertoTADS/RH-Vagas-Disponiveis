const ParamError =  require('./../../error/param-error');

module.exports = () => {
    const subscribe = async (subscribe) => {
        if(!subscribe) throw new ParamError('object subscribe in body is required');
        if(!subscribe.idUser) throw new ParamError('subscribe.identifier in body is required');
        if(!subscribe.idVacancie) throw new ParamError('subscribe.idVacancie in body is required');  
    }
    return { subscribe }
}