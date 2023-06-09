const express = require('express');

const respuesta = require('../../red/respuestas')
const controlador = require('./index');

const router = express.Router();

//rutas
router.get('/', todos);
router.get('/libres', libres);
router.get('/asignados', asignados);
router.get('/:id', uno);
router.post('/',agregar);
router.put('/',eliminar);
router.put('/actualizartecnico', actualizartecnico);




//funciones de rutas
async function todos(req, res, next) {
    try{
        const items = await controlador.todos()
        respuesta.succes(req,res, items, 200)
    }catch(err){
        next(err)
    }
};

async function actualizartecnico(req, res, next) {
    try{
        const items = await controlador.actualizartecnico(req.body)
        respuesta.succes(req,res, items, 200)
    }catch(err){
        next(err)
    }
};

async function asignados(req, res, next) {
    try{
        const items = await controlador.asignados()
        respuesta.succes(req,res, items, 200)
    }catch(err){
        next(err)
    }
};

async function libres(req, res, next) {
    try{
        const items = await controlador.libres()
        respuesta.succes(req,res, items, 200)
    }catch(err){
        next(err)
    }
};

async function uno(req, res, next) {
    try{
        const items = await controlador.uno(req.params.id)
        respuesta.succes(req,res, items, 200)
    }catch(err){
        next(err)
    }
};

async function agregar(req, res, next) {
    try{
        const items = await controlador.agregar(req.body);
        if(req.body.id == 0){
            mensaje = 'item guardado con exito';
        }else{
            mensaje = 'item actualizado con exito';
        }
        respuesta.succes(req,res, mensaje, 201);
    }catch(err){
        next(err)
    }
};


async function eliminar(req, res, next) {
    try{
        const items = await controlador.eliminar(req.body);
        respuesta.succes(req,res, 'item eliminado satisfactoriamente', 200);
    }catch(err){
        next(err)
    }
};



module.exports = router;