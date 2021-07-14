const express = require('express');

module.exports = ( app ) => {
    const router = express.Router();
    
    router.use('/user', app.routes.user)
    router.use('/vacancie', app.routes.vacancie)
    router.use('/curriculum', app.routes.curriculum)
    
    app.use('/api',router)
    return router
}