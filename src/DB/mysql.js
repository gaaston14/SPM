const mysql = require('mysql');
const config = require('../config');
const { error } = require('../red/respuestas');

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

function todos(tabla){
    return new Promise( (resolve, reject) =>{
        conexion.query(`SELECT * FROM ${tabla}`, (error, result) =>{
            if (error) return reject(error);
            resolve (result);

        })
    })
}

function uno(tabla, id){

}

function agregar(tabla, data){

}

function eliminar(tabla,id){

}

module.exports = {
    todos,
    uno,
    agregar,
    eliminar,
}