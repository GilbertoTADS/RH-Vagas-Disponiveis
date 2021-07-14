const express = require('express');
const cors = require('cors');
const compression = require('compression');

module.exports = ( app ) => {
    
    app.use(express.json());
    app.use(cors());
    app.use(compression());
    
    return { app }
}