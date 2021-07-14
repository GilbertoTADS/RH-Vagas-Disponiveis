const ParamError =  require('./../../error/param-error');

module.exports = () => {
    const validFormations = async (formations) => {
        if(!formation) throw new ParamError('object user.formations in body is required');
        if(!formation.institution) throw new ParamError(' user.formations.institution in body is required');
        if(!formation.nameOfCourse) throw new ParamError(' user.formations.nameOfCourse in body is required');
        if(!formation.courseFinished) throw new ParamError(' user.formations.courseFinished in body is required');
        if(!formation.dateConclusion) throw new ParamError(' user.formations.dateConclusion in body is required');
        if(!formation.dateInited) throw new ParamError(' user.formations.dateInited in body is required');
        if(!formation.dateFinal) throw new ParamError(' user.formations.dateFinal in body is required');
    }
    return { validFormations }
}