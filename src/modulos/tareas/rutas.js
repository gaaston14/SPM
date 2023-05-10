const express = require('express');

const respuesta = require('../../red/respuestas')
const controlador = require('./index');

const router = express.Router();

//rutas
router.get('/', todos);
router.get('/tareaprecio', todosInner);
router.get('/:id', uno);
router.post('/',agregar);
router.post('/RegistrarTarea',RegistrarTarea);
router.post('/agregarTarea',agregar);
router.post('/agregarPrecioTarea',agregarPrecioTarea);
router.put('/',eliminar);




//funciones de rutas
async function todos(req, res, next) {
    try{
        const items = await controlador.todos()
        respuesta.succes(req,res, items, 200)
    }catch(err){
        next(err)
    }
};

async function todosInner(req, res, next) {
    try{
        const items = await controlador.todosInner()
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
        const result = await controlador.agregar(req.body);
        const id = result.id;
        if(req.body.id == 0){
            mensaje = 'item guardado con exito';
        }else{
            mensaje = 'item actualizado con exito';
        }
        console.log(id);
        respuesta.succes(req,res, mensaje, id, 201);
    }catch(err){
        next(err)
    }
};

async function RegistrarTarea(req, res, next) {
    try{
        const items = await controlador.RegistrarTarea(req.body);
        respuesta.succes(req,res, 'Tarea guardada exitosamente', 201);
    }catch(err){
        next(err)
    }
};

async function agregarTarea(req, res, next) {
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

async function agregarPrecioTarea(req, res, next) {
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