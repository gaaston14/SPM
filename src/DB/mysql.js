const mysql = require('mysql');
const config = require('../config');
const { error } = require('../red/respuestas');

//parametros para coenctarse a la base
const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
}

let conexion;

function conexionMysql(){
    conexion = mysql.createConnection(dbconfig);
    conexion.connect((err) => {
        if(err){
            console.log('db error', err);
            setTimeout(conexionMysql, 200);
        }else{
            console.log('base de datos conectada!!')
        }
    })

    conexion.on('error', err =>{
        console.log('error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST'){
            conexionMysql();
        }else{
            throw err;
        }
    })
}
conexionMysql();


//funciones para devolver datos de la base
function todos(tabla){
    return new Promise( (resolve, reject) =>{
        conexion.query(`SELECT * FROM ${tabla}`, (error, result) =>{
            return (error) ? reject(error) : resolve(result);
        })
    })
}

function todosInner(tabla, tabla2){
    return new Promise( (resolve, reject) =>{
        conexion.query(`SELECT * FROM ${tabla} INNER JOIN ${tabla2} ON ${tabla}.id = ${tabla2}.id`, (error, result) =>{
            return (error) ? reject(error) : resolve(result);
        })
    })
}

function todosInner2(tabla, tabla2,tabla3){
    return new Promise( (resolve, reject) =>{
        conexion.query(`SELECT *
        FROM ${tabla}
        INNER JOIN ${tabla2} ON ${tabla}.idGupo = ${tabla2}.id
        INNER JOIN ${tabla3} ON ${tabla}.idTecnico = ${tabla3}.id`, (error, result) =>{
            return (error) ? reject(error) : resolve(result);
        })
    })
}

function uno(tabla, id){
    return new Promise( (resolve, reject) =>{
        conexion.query(`SELECT * FROM ${tabla} WHERE id=${id}`, (error, result) =>{
            return (error) ? reject(error) : resolve(result);
        })
    })
}

function agregar(tabla,data){
    return new Promise( (resolve, reject) =>{
        conexion.query(`INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE ?`, [data,data] , (error, result) =>{
            return (error) ? reject(error) : resolve(result);
        })
    })
}


function eliminar(tabla,data){
    return new Promise( (resolve, reject) =>{
        conexion.query(`DELETE FROM ${tabla} WHERE id = ?` ,data.id, (error, result) =>{
            return (error) ? reject(error) : resolve(result);
        })
    })
}

function query(tabla,consulta){
    return new Promise( (resolve, reject) =>{
        conexion.query(`SELECT * FROM ${tabla} WHERE ?`, consulta, (error, result) =>{
            return (error) ? reject(error) : resolve(result[0]);
        })
    })
}

module.exports = {
    todos,
    uno,
    agregar,
    eliminar,
    query,
    todosInner,
    todosInner2,
}