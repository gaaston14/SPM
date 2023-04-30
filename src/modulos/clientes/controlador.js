const db =require('../../DB/mysql');

const tabla = 'tecnicos';

function todos(){
    return db.todos(tabla);
}

module.exports = {
    todos,
}