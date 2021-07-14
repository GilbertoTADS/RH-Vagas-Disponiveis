const express = require('express');
const consign = require('consign');
const knex = require('knex');
const knexfile = require('./knexfile');
const server = require('./server');

const app = express();
server(app);
app.db = process.env.NODE_ENV === 'development' ? knex(knexfile.development) : knex(knexfile.production);

consign({cwd:'src', verbose:false})
    .include('/config/middleware.js')
    .then('/services')
    .then('/routes')
    .then('/config/routes.js')
    .then('/page-redirect')
    .into(app)

app.use('/',express.static(__dirname + '/../../vagas/dist/vagas'));
app.use((err, req, res, next) => {  
    const { name, message, stack } = err;
    if (name === 'ParamError') res.status(400).json({ error: message });
    else res.status(500).json({ name, message, stack });
    next(err);
    });



module.exports = app;