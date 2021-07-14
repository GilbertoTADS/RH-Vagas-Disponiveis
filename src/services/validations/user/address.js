const ParamError =  require('./../../../error/param-error');

module.exports = () => {
    const validAddressUser = async (address) => {
        if(!address) throw new ParamError('object user.address in body is required');
        if(!address.cep) throw new ParamError('object user.address.cep in body is required');
        if(!address.street) throw new ParamError('object user.address.street in body is required');
        if(!address.homeNumber) throw new ParamError('object user.address.homeNumber in body is required');
        if(!address.district) throw new ParamError('object user.address.district in body is required');
        if(!address.city) throw new ParamError('object user.address.city in body is required');
        if(!address.state) throw new ParamError('object user.address.state in body is required');
        
    }
    return { validAddressUser }
}
