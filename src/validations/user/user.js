const ParamError =  require('./../../error/param-error');

module.exports = () => {
    const validUser = async (user) => {
        if(!user) throw new ParamError('object user in body is required');
        if(!user.identifier) throw new ParamError('user.identifier in body is required');
        if(!user.fullName) throw new ParamError('user.fullName in body is required');
        if(!user.birthDate) throw new ParamError('user.birthDate in body is required');
        return;
    }
    return { validUser}
}