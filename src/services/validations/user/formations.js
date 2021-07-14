const ParamError =  require('./../../../error/param-error');

module.exports = () => {
    const validFormations = async (formations) => {
        if(!formations) throw new ParamError('object user.formations in body is required');
        if(!formations.institution) throw new ParamError(' user.formations.institution in body is required');
        if(!formations.nameOfCourse) throw new ParamError(' user.formations.nameOfCourse in body is required');
        if(!formations.courseFinished) throw new ParamError(' user.formations.courseFinished in body is required');
        if(!formations.dateConclusion) throw new ParamError(' user.formations.dateConclusion in body is required');
        if(!formations.dateInited) throw new ParamError(' user.formations.dateInited in body is required');
        if(!formations.dateFinal) throw new ParamError(' user.formations.dateFinal in body is required');
    }
    return { validFormations }
}