const db =require('../../DB/mysql');

const tabla = 'auth';


module.exports = function (dbInyectada){

    let db = dbInyectada;
    if (!db){
        db = require('../../DB/mysql')
    }

    async function login(usuario,password){
        const data = await db.query(tabla,{usuario: usuario});
        let prueba = ''
        if (data.password = password){
            prueba = true;
        }else{
            prueba = false;
        }

        return 
    }

    
    function agregar (data) {
        const authData = {
            id: data.id
        }
        if (data.usuario){
            authData.usuario = data.usuario
        }
        if(data.password){
            authData.password = data.password
        }
        return db.agregar(tabla,authData);
    }
    return{
    agregar
    }
}