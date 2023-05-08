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

    function todosInner2 () {
        console.log(tabla,tabla2,tabla3)
        return db.todosInner2(tabla,tabla2,tabla3);
    }

    return{
    todos,
    uno,
    agregar,
    eliminar,
    todosInner2
    }
}