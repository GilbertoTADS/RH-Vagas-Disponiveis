const express = require('express');
const { validSubscribeVacancie } = require('./../validations/index');

module.exports = ( app ) => {
    const router = express.Router();

    router.get('/:idUser', async (req, res, next) => {
        try {
            const { idUser } = req.params;
            const result = await app.services.vacancie.getMyVacancies(idUser);
            return res.status(200).json(result);
        } catch (e) {
            console.log(e)
            next(e);
        }
    })

    router.post('/', async (req, res, next) => {
        try {
            const result = await app.services.vacancie.getVacancie();
            return res.status(200).json(result);
        } catch (e) {
            console.log(e)
            next(e);
        }
    })
    router.post('/subscribe', async (req, res, next) => {
        try {
            await validSubscribeVacancie(req.body.subscribe);
            const { idUser, idVacancie } = req.body.subscribe;

            const susbcriptionExists = await app.services.vacancie.subscriptionExists(idUser, idVacancie);
            if(susbcriptionExists.length > 0) return res.status(202).json({ error:false, message:'user only subscribed' })

            const result = await app.services.vacancie.subscribe( idUser, idVacancie );
            return res.status(200).json(result);
        } catch (e) {
            console.log(e)
            next(e);
        }
        
    })
    router.delete('/:idUser/:idVacancie', async (req, res, next) => {
        try {
            const { idUser, idVacancie } = req.params;
            const result = await app.services.vacancie.deleteMyInscription(idUser, idVacancie);
            return res.status(204).json(result);
        } catch (e) {
            console.log(e)
            next(e);
        }
    })

    return router;
}