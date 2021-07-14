const ParamError =  require('./../../error/param-error');

module.exports = () => {
    const validContactUser = async(contact) => {
        if(!contact) throw new ParamError('user.contact in body is required');
        if(!contact.email) throw new ParamError('user.contact.email in body is required');
        if(!contact.cell) throw new ParamError('user.contact.cell in body is required');
    }
    return { validContactUser }
}
