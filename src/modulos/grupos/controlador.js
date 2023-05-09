const db =require('../../DB/mysql');

const tabla = 'grupos_tecnicos';
const tabla2 = 'grupos';
const tabla3 = 'tecnicos';



module.exports = function (dbInyectada){

    let db = dbInyectada;
    if (!db){
        db = require('../../DB/mysql')
    }

    function todos(){
        return db.todos(tabla2);
    }

    function libres(){
        campo = 'idGupo';
        return db.libres(tabla2,tabla,campo);
    }
    
    function uno(id){
        return db.uno(tabla,id);
    }
    
    function agregar (body) {
        return db.agregar(tabla2,body);
    }
    
    function eliminar (body) {
        return db.eliminar(tabla,body);
    }

    function todosInner2 () {
        return db.todosInner2(tabla,tabla2,tabla3);
    }

    function gruposleft () {
        return db.gruposleft(tabla,tabla2,tabla3);
    }

    return{
    todos,
    libres,
    uno,
    agregar,
    eliminar,
    todosInner2,
    gruposleft,
    }
}