const db =require('../../DB/mysql');

const tabla = 'tecnicos';
const tabla2 = 'grupos_tecnicos';



module.exports = function (dbInyectada){

    let db = dbInyectada;
    if (!db){
        db = require('../../DB/mysql')
    }

    function todos(){
        return db.todos(tabla);
    }

    function libres(){
        campo = 'idTecnico';
        return db.libres(tabla,tabla2,campo);
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
    libres,
    uno,
    agregar,
    eliminar
    }
}