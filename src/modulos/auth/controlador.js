const db =require('../../DB/mysql');
const auth = require('../../autenticacion')
const tabla = 'auth';
const bcrypt = require('bcrypt');

module.exports = function (dbInyectada){

    let db = dbInyectada;
    if (!db){
        db = require('../../DB/mysql')
    }

    async function login(usuario,password){
        const data = await db.query(tabla,{usuario: usuario});
        return bcrypt.compare(password, data.password)
        .then(resultado => {
            if(resultado === true){
                //genera token
                return auth.asignarToken({data})
            }else{
                throw new Error ('informacion invalidaa'); 
            }
        })
    }

    
    async function agregar (data) {
        const authData = {
            id: data.id
        }
        if (data.usuario){
            authData.usuario = data.usuario
        }
        if(data.password){
            authData.password = await bcrypt.hash(data.password.toString(), 5);
        }
        return db.agregar(tabla,authData);
    }
    return{
    agregar,
    login
    }
}