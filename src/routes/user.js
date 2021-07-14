const express = require('express');
const { validUser, validAddressUser, validContactUser, validExperiences, validFormations } = require('./../validations/index');
const ParamError = require('./../error/param-error');

module.exports = ( app ) => {
    const router = express.Router();
    
    router.get('/:CPFCNPJ',async (req, res, next) => {
        try{
            const { CPFCNPJ } = req.params;
            if(!(CPFCNPJ.length === 11 || CPFCNPJ.length === 14)) throw new ParamError('param CPFCNPJ is required'); 
            const result = await app.services.user.getUserByIdentifier(CPFCNPJ); 
            return res.status(200).json(result);
        }catch(e){
            console.log(e)
            next(e);
        }
    })

    router.post('/login', async (req, res, next) => {
        try {
            if(!req.body.email) throw new ParamError('param email is required');
            if(!req.body.password) throw new ParamError('password identifier is required');
            const result = await app.services.user.getUser(req.body.email,req.body.password);
            return res.status(200).json(result);
        } catch (e) {
            next(e);
        }
    })

    router.post('/', async (req, res, next) => {
        try{
            await validUser(req.body.user);
            await validAddressUser(req.body.user.address);
            await validContactUser(req.body.user.contact);
            
            const { user } = req.body
            const userExists = await app.services.user.userExists(user.identifier, user.contact.email);
            if(userExists.length > 0) return res.status(202).json({ error:false, message:'user already exist' })

            const result = await app.services.user.saveUser(user);
            if(user.address){
                const addressDb = await app.services.user.saveAdrress(result[0].IDUSER,user.address);
                result[0].address = addressDb;  
            }
            if(user.formation){
                const formationDb = await app.services.user.saveFormation(result[0].IDUSER,user.formation);
                result[0].formation = formationDb;
            }
            if(user.experience){
                const experienceDb = await  app.services.user.saveExperience(result[0].IDUSER,user.experience);
                result[0].experience = experienceDb;
            }
            return res.status(201).json(result);
        
        }catch( e ) {
            console.log(e)
            next(e);
        }
    })

    router.put('/', async (req, res, next) => {
        try{
            await validUser(req.body.user);
            await validAddressUser(req.body.user.address);
            await validContactUser(req.body.user.contact);
            if(req.body.user.formation){
                await app.services.user.deleteFormation(req.body.IDUSER);
                await app.services.user.saveFormation(req.body.IDUSER,req.body.user.formation);
            } 
            if(req.body.user.experience){
                await app.services.user.deleteExperience(req.body.IDUSER);
                await app.services.user.saveExperience(req.body.IDUSER,req.body.user.experience);
            }
            await app.services.user.updateUser(req.body.IDUSER, req.body.user);
            res.status(204).json({ error:false, message:'OK' });
        }catch(e){
            console.log(e)
            next(e);
        }
    })
    return router;
}