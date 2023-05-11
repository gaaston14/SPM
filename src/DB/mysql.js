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

function libres(tabla,tabla2,campo){
    return new Promise( (resolve, reject) =>{
        conexion.query(`select * from ${tabla} 
        where ${tabla}.id not in (select ${tabla2}.${campo} from ${tabla2})`, (error, result) =>{
            return (error) ? reject(error) : resolve(result);
        })
    })
}

function todosInner(tabla, tabla2){
    return new Promise( (resolve, reject) =>{
        conexion.query(`SELECT t.nombre, t1.id,t1.fechaDesde, t2.precio 
                FROM ${tabla2} t1
                INNER JOIN (
                SELECT id, MAX(fechaDesde) as maxFecha
                FROM ${tabla2}
                GROUP BY id
                ) t3 ON t1.id = t3.id AND t1.fechaDesde = t3.maxFecha
                INNER JOIN ${tabla2} t2 ON t1.id = t2.id AND t1.fechaDesde = t2.fechaDesde
                INNER JOIN ${tabla} t
            ON t2.id=t.id`, (error, result) =>{
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

function gruposleft(tabla, tabla2, tabla3) {
    return new Promise((resolve, reject) => {
      conexion.query(
        `drop temporary table if exists maxfecha;`,
        (error) => {
          if (error) {
            return reject(error);
          }
          conexion.query(
            `
            create temporary table maxfecha
            select ${tabla}.idGupo, ${tabla}.idTecnico, max(${tabla}.fechaAsig) as fecha from ${tabla}
            where ${tabla}.fechaFin is null
            group by ${tabla}.idGupo, ${tabla}.idTecnico`,
            (error) => {
              if (error) {
                return reject(error);
              }
                conexion.query(
                    ` SELECT g.id, g.descripcion, gt.idTecnico, t.nombre, gt.fechaAsig, gt.fechaFin 
                    FROM ${tabla2} AS g
                    LEFT JOIN ${tabla} AS gt ON g.id = gt.idGupo
                    LEFT JOIN ${tabla3} AS t ON t.id = gt.idTecnico
                    LEFT JOIN maxfecha mf ON mf.idGupo=gt.idGupo and mf.idTecnico=t.id
                    WHERE gt.fechaFin is null`,
                    (error, result) => {
                    return error ? reject(error) : resolve(result);
                    }
          );
        }
      );
    });
  }
)}

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

function RegistrarTarea(tabla,data){
    return new Promise( (resolve, reject) =>{
        conexion.query(`INSERT INTO ${tabla} SET ? `, [data] , (error, result) =>{
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
    libres,
    uno,
    agregar,
    eliminar,
    query,
    todosInner,
    todosInner2,
    gruposleft,
    RegistrarTarea
}