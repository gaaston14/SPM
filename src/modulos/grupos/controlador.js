const db =require('../../DB/mysql');

const tabla = 'grupos';



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
    
    function agregar (body) {
        return db.agregar(tabla,body);
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