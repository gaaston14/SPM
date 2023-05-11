const express = require('express');

const respuesta = require('../../red/respuestas')
const controlador = require('./index');

const router = express.Router();

//rutas
router.get('/', todos);
router.get('/tareaprecio', todosInner);
router.get('/ListarTareas', ListarTareas);
router.get('/ListarCertificaciones', ListarCertificaciones);
router.get('/:id', uno);
router.post('/',agregar);
router.post('/RegistrarTarea',RegistrarTarea);
router.post('/agregarTarea',agregarTarea);
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

async function ListarCertificaciones(req, res, next) {
    try{
        const items = await controlador.ListarCertificaciones(req.body)
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

async function ListarTareas(req, res, next) {
    try{
        const items = await controlador.ListarTareas()
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
        const tarea={
            id: req.body.id,
            nombre: req.body.nombre,
        };
        const result = await controlador.agregar(tarea);
        const hoy = new Date();
        const anio = hoy.getFullYear();
        const mes = ('0' + (hoy.getMonth() + 1)).slice(-2);
        const dia = ('0' + hoy.getDate()).slice(-2);
        const fecha = `${anio}-${mes}-${dia}`;
        const precio ={
                id:result.insertId,
                fechaDesde:fecha,
                precio:req.body.precio
        }
        if(req.body.id == 0){
            mensaje = 'item guardado con exito';
        }else{
            mensaje = 'item actualizado con exito';
        }
        await controlador.agregarPrecioTarea(precio);
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