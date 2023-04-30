const db =require('../../DB/mysql');

const tabla = 'tecnicos';

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

module.exports = {
    todos,
    uno,
    agregar,
    eliminar,
}