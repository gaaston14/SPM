const db =require('../../DB/mysql');

const tabla = 'usuarios';
const auth = require('../auth')


module.exports = function (dbInyectada){

    let db = dbInyectada;
    if (!db){
        db = require('../../DB/mysql')
    }

    function todos(){
        return db.todos(tabla);
    }
    
    function uno(id){
        return db.uno(tabla,id);
    }
    
    async function agregar (body) {
        const usuario = {
            id: body.id,
            nombre: body.nombre,
            activo: body.activo
        }
        const respuesta = await db.agregar(tabla,usuario);
        var insertId = 0;
        if(body.id == 0){
            insertId = respuesta.insertId
        }else{
            insertId = body.id
        }
        var respuesta2 = ''
        if(body.usuario || body.password){
            const respuesta2 = await auth.agregar({
                id: insertId,
                usuario: body.usuario,
                password: body.password
            })
        }
        return respuesta2;
    }
    
    function eliminar (body) {
        return db.eliminar(tabla,body);
    }

    return{
    todos,
    uno,
    agregar,
    eliminar
    }
}