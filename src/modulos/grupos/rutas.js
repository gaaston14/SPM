const express = require('express');

const respuesta = require('../../red/respuestas')
const controlador = require('./index');

const router = express.Router();

//rutas
router.get('/', todos);
router.get('/libres', libres);
router.get('/asignados', asignados);
router.get('/grupostecnicos', todosInner2);
router.get('/gruposleft', gruposleft);
router.put('/editarGrupo',actualizargrupo);
router.get('/:id', uno);
router.post('/',agregar);
router.post('/agregarGrupo',agregarGrupo);
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

async function actualizargrupo(req, res, next) {
    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = ('0' + (hoy.getMonth() + 1)).slice(-2);
    const dia = ('0' + hoy.getDate()).slice(-2);
    const fecha = `${anio}-${mes}-${dia}`;
    const grupo ={
            fechaFin:fecha,
            idGupo:req.body.idGupo,
            idTecnico:req.body.idTecnico
    }
    try{
        const items = await controlador.actualizargrupo(grupo)
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

async function gruposleft(req, res, next) {
    try{
        const items = await controlador.gruposleft()
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

async function todosInner2(req, res, next) {
    try{
        const items = await controlador.todosInner2()
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

async function agregarGrupo(req, res, next) {
    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = ('0' + (hoy.getMonth() + 1)).slice(-2);
    const dia = ('0' + hoy.getDate()).slice(-2);
    const fecha = `${anio}-${mes}-${dia}`;
    const nuevogrupo ={
            idGupo:req.body.idGupo,
            idTecnico:req.body.idTecnico,
            fechaAsig:fecha,
            fechaFin:null,
    }
    try{
        const items = await controlador.agregarGrupo(nuevogrupo);
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