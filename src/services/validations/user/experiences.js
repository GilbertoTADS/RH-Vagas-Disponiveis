const ParamError =  require('./../../../error/param-error');

module.exports = () => {
    const validExperiences = async (experiences) => {
        if(!experiences) throw new ParamError('object user.experiences in body is required');
        if(!experiences.nameBussiness) throw new ParamError('user.experiences.nameBussiness in body is required');
        if(!experiences.dateInited) throw new ParamError('user.experiences.dateInited in body is required');
        if(!experiences.dateFinal) throw new ParamError('user.experiences.dateFinal in body is required');
        if(!experiences.office) throw new ParamError('user.experiences.office in body is required');
        if(!experiences.describe) throw new ParamError('user.experiences.describe in body is required');
    }
    return { validExperiences }
}
