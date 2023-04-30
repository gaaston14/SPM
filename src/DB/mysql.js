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

function uno(tabla, id){
    return new Promise( (resolve, reject) =>{
        conexion.query(`SELECT * FROM ${tabla} WHERE id=${id}`, (error, result) =>{
            return (error) ? reject(error) : resolve(result);
        })
    })
}

function insertar(tabla,data){
    console.log(data);
    return new Promise( (resolve, reject) =>{
        conexion.query(`INSERT INTO ${tabla} SET ?` ,data , (error, result) =>{
            return (error) ? reject(error) : resolve(result);
        })
    })
}

function actualizar(tabla, data) {
    return new Promise((resolve, reject) => {
      conexion.query(`UPDATE ${tabla} SET ? WHERE id = ?`, [data, data.id], (error, result) => {
        return (error) ? reject(error) : resolve(result);
      })
    })
  }

function agregar(tabla, data){
    if(data && data.id == 0){
        return insertar(tabla, data);
    }else{
        return actualizar(tabla, data);
    }
}

function eliminar(tabla,data){
    console.log(data.id);
    return new Promise( (resolve, reject) =>{
        conexion.query(`DELETE FROM ${tabla} WHERE id = ?` ,data.id, (error, result) =>{
            return (error) ? reject(error) : resolve(result);
        })
    })
}


module.exports = {
    todos,
    uno,
    agregar,
    eliminar,
}