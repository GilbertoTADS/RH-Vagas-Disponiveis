const ParamError = require('./../../../error/param-error');

module.exports = class CreatorUserCurriculum {
    constructor(){
        this.userCurriculum = {};
        this.usersCurriculmns = Array();
    }
    createUser(userFull){
        if(!userFull) throw new ParamError({ error:true, message:'Not found user'});
        Object.keys(userFull).forEach( key => {
            if(!isNaN(key) && typeof userFull[key] === 'object' && userFull[key]) this.createUser(userFull[key])
            const data = {
                'CPFCNPJ': () => this.userCurriculum.CPF = userFull[key],
                'NOME': () => this.userCurriculum.Nome = userFull[key],
                'SEXO': () => this.userCurriculum.Sexo = userFull[key],
                'DTNASCIMENTO': () => this.userCurriculum.Data_Nascimento = userFull[key],
                'ESTADOCIVIL': () => this.userCurriculum.Estado_Civil = userFull[key],
                'CEP': () => this.userCurriculum.CEP_Residencia = userFull[key],
                'BAIRRO': () => this.userCurriculum.Bairro_Residencia = userFull[key],
                'CIDADE': () => this.userCurriculum.Cidade_Residencia = userFull[key],
                'ESTADO': () => this.userCurriculum.UF_Residencia = userFull[key],
                'CONTATO': () => this.userCurriculum.Telefone_Celular = userFull[key],
                'EMAIL': () => this.userCurriculum.E_mail = userFull[key],
                'FLAGPERMITEENVIOEMAIL': () => this.userCurriculum.Permite_Informar_Email = userFull[key],
            }
            if(typeof data[key] === 'function') data[key]();
        })
        return this._orderAttributos(this.userCurriculum);
    }
    createMultipleUsers(multipleUserFull){
        if(!multipleUserFull) throw new ParamError({ error:true, message:'Not found multiple users'});
        if(typeof multipleUserFull !== 'object' || multipleUserFull.length === undefined) throw new ParamError({ error:true, message:'this users is not multiples'});
        multipleUserFull.forEach(obj => {
            console.log('Objeto ---> ',obj)
            this.usersCurriculmns.push(this.createUser(obj));
        })
        return this.usersCurriculmns;
    }
    _orderAttributos(userCurriculum){
        return {
            'CPF': userCurriculum.CPF,
            'NOME': userCurriculum.Nome,
            'SEXO': userCurriculum.Sexo,
            'DATA_NASCIMENTO': userCurriculum.Data_Nascimento,
            'ESTADO_CIVIL': userCurriculum.Estado_Civil,
            'CEP': userCurriculum.CEP_Residencia,
            'BAIRRO': userCurriculum.Bairro_Residencia,
            'CIDADE': userCurriculum.Cidade_Residencia,
            'UF': userCurriculum.UF_Residencia,
            'TELEFONE': userCurriculum.Telefone_Celular,
            'EMAIL': userCurriculum.E_mail,
            'PERMITE_ENVIO_EMAIL': userCurriculum.Permite_Informar_Email,
        }
    }
    

}