const express = require('express');
const ParamError = require('./../error/param-error');
const Excel = require('./../lib/export_excel/index');

const { PhoneMasks,CreatorUserCurriculum } = require('./../utils')

module.exports = ( app ) => {
    const router = express.Router();
    
    const convertCurrency = (currency) => {
        if(!currency) currency = 0;
        return parseFloat(currency).toFixed(2)
            .replace(/\./g,',').padStart(10,'0');
    }
    const verifyGenre = (flag) => {
        if(flag === 'M') return 'MASCULINO';
        if(flag === 'F') return 'FEMININO';
        return 'NÃO INFORMADO';
    }
    const verifyMaritialStatus = (flag) =>{
        const status = {
            'V': () => 'VIÚVO(A)',
            'D': () => 'DIVORCIADO(A)',
            'C': () => 'CASADO(A)',
            'S': () => 'SOLTEIRO'
        }
        if(typeof status[flag] === 'function') return status[flag]();
        return 'NÃO INFORMADO';
    }
    const verifyFormatData = (userDb) => {
        userDb.forEach((value, index) => {
            Object.keys(value).forEach(field => {
                const actions = {
                    'RECADO': () => userDb[index][field] = new PhoneMasks().format(userDb[index][field]),
                    'CONTATO': () => userDb[index][field] = new PhoneMasks().format(userDb[index][field]),
                    'SEXO': () => userDb[index][field] = verifyGenre(userDb[index][field]),
                    'FLAGCONCLUIDO': () => userDb[index][field] = userDb[index][field] == 'Y' ? 'SIM' : 'NÃO',
                    'ESTADOCIVIL': () => userDb[index][field] = verifyMaritialStatus(userDb[index][field]),
                    'DEFICIENTE': () => userDb[index][field] = userDb[index][field] == '1' ? 'SIM' : 'NÃO',
                    'PRETENSAOSALARIAL': () => userDb[index][field] = userDb[index][field] !== undefined ? convertCurrency(userDb[index][field]) : convertCurrency(0),
                    'FLAGPERMITEENVIOEMAIL':() => userDb[index][field] = userDb[index][field] == 'N' ? 'Não' : 'Sim'
                }
                if(typeof actions[field.trim()] === 'function') actions[field]();
            })
        })
        return userDb;
    }
    router.get('/all', async (req, res, next) => {
        try{
            const columns = ["IDUSER","CPFCNPJ","NOME","SEXO","DTNASCIMENTO","ESTADOCIVIL","UFNASCIMENTO","EMAIL","CONTATO", "FLAGPERMITEENVIOEMAIL"];
            const addresFields = ["CEP","BAIRRO","LOGRADOURO","NUMERO","CIDADE","ESTADO"];
            const formationFileds = ["CURSO","INSTITUICAO","FLAGCONCLUIDO","DTINICIO","DTCONCLUSAO"];
            const experienceFileds = ["EMPRESA","DTINICIO","DTSAIDA","CARGO","ATRIBUICOES"];
            const allColumns = columns.concat(addresFields,formationFileds,experienceFileds);
            let userDb = await app.services.generic.getAll(allColumns);
            userDb = verifyFormatData(userDb);
            const userCreator = new CreatorUserCurriculum();
            const userCurriculum = userCreator.createMultipleUsers(userDb);
            
            const excel = new Excel('titleWorksheet',userCurriculum[0],`Curriculum.xlsx`);
            
            for(let i = 1;i<=userCurriculum.length-1;i++){
                excel._rowIndex += 1;
                excel._headingColumnIndex = 1;
                excel._inserValues(userCurriculum[i]);
            }
            excel._wb.write(`Curriculum.xlsx`, res);
        }catch(e){
            console.log(e);
            next(e);
        }
    })

    router.get('/:CPFCNPJ',async (req, res, next) => {
        try{
            const { CPFCNPJ } = req.params;
           
            if(!(CPFCNPJ.length === 11 || CPFCNPJ.length === 14)) throw new ParamError('param CPFCNPJ is required');
            const columns = ["IDUSER","CPFCNPJ","NOME","SEXO","DTNASCIMENTO","ESTADOCIVIL","UFNASCIMENTO","EMAIL","CONTATO", "FLAGPERMITEENVIOEMAIL"];
            let userDb = await app.services.user.getUserByIdentifier(CPFCNPJ, columns);
            userDb = verifyFormatData(userDb);
            if(!userDb.length > 0) return res.status(200).json({ error:false, message:'user not exists' });
            const addresFields = ["CEP","LOGRADOURO","NUMERO","BAIRRO","CIDADE","ESTADO"];
            const addressDb = await app.services.user.getAdrress(userDb[0].IDUSER,addresFields);
            userDb.push(addressDb[0]);
            const formationFileds = ["CURSO","INSTITUICAO","FLAGCONCLUIDO","DTINICIO","DTCONCLUSAO"]
            const formation = await app.services.user.getFormation(userDb[0].IDUSER,formationFileds);
            userDb.push(formation);
            const experienceFileds = ["EMPRESA","DTINICIO","DTSAIDA","CARGO","ATRIBUICOES"]
            const experience = await app.services.user.getExperience(userDb[0].IDUSER, experienceFileds);
            userDb.push(experience);
            const userCreator = new CreatorUserCurriculum();
            const userCurriculum = userCreator.createUser(userDb);
            const excel = new Excel('titleWorksheet',userCurriculum,`Curriculum.xlsx`);
            excel._wb.write(`Curriculum.xlsx`, res);
        }catch(e){
            console.log(e)
            next(e);
        }
    })

    router.get('/json/:CPFCNPJ',async (req, res, next) => {
        try{
            const { CPFCNPJ } = req.params;
           
            if(!(CPFCNPJ.length === 11 || CPFCNPJ.length === 14)) throw new ParamError('param CPFCNPJ is required');
            const columns = ["IDUSER","NOME","DTNASCIMENTO","CPFCNPJ","ESTADOCIVIL","SEXO","UFNASCIMENTO","DEFICIENTE","APRESENTACAO","EMAIL","CONTATO","RECADO","LINKEDIN"];
            const userDb = await app.services.user.getUserByIdentifier(CPFCNPJ, columns);
            if(!userDb.length > 0) return res.status(200).json({ error:false, message:'user not exists' });
            const addresFields = ["CEP","LOGRADOURO","NUMERO","BAIRRO","CIDADE","ESTADO"];
            const addressDb = await app.services.user.getAdrress(userDb[0].IDUSER,addresFields);
            userDb.push(addressDb[0]);
            const formationFileds = ["CURSO","INSTITUICAO","FLAGCONCLUIDO","DTINICIO","DTCONCLUSAO"]
            const formation = await app.services.user.getFormation(userDb[0].IDUSER,formationFileds);
            userDb.push(formation);
            const experienceFileds = ["EMPRESA","DTINICIO","DTSAIDA","CARGO","ATRIBUICOES"]
            const experience = await app.services.user.getExperience(userDb[0].IDUSER, experienceFileds);
            userDb.push(experience);
            delete userDb[0].IDUSER;
            res.status(200).json(userDb);
        }catch(e){
            console.log(e);
            next(e);
        }
    })
    return router;
}