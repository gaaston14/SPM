const express = require('express');
const config = require('./config');
const morgan = require('morgan');
const tecnicos = require('./modulos/tecnicos/rutas');
const tareas = require('./modulos/tareas/rutas');
const grupos = require('./modulos/grupos/rutas');
const usuarios = require('./modulos/usuarios/rutas');
const error = require('./red/errors');
const auth = require('./modulos/auth/rutas');

const app = express();

//CORS
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//configuracion
app.set('port', config.app.port)

//rutas
app.use('/api/tecnicos',tecnicos);
app.use('/api/tareas',tareas);
app.use('/api/tareas',tareas);
app.use('/api/grupos',grupos);
app.use('/api/usuarios',usuarios);
app.use('/api/auth',auth);
app.use(error);


module.exports = app;