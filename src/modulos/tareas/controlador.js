const db =require('../../DB/mysql');

const tabla = 'tareas';
const tabla2 = 'preciotareas';
const tabla3 = 'grupos_tareas';
const tabla4 = 'grupos';
const tabla5 = 'tecnicos';
const tabla6 = 'grupos_tecnicos';


module.exports = function (dbInyectada){

    let db = dbInyectada;
    if (!db){
        db = require('../../DB/mysql')
    }

    function todos(){
        return db.todos(tabla);
    }

    function sumatareas(){
      return db.sumatareas(tabla,tabla3);
  }
    
    function uno(id){
        return db.uno(tabla,id);
    }
    
    function agregar (body) {
        return db.agregar(tabla,body);
    }

    //Tareas
    async function RegistrarTarea(data) {
        try {
          const tareas = data.tareas || []; // Verificar si existe la propiedad "tareas" y si contiene un array
          const result = [];
      
          for (const tarea of tareas) { // Iterar sobre el array "tareas"
            const tareaData = {
              idgrupo: data.idgrupo, // Convertir a string para cumplir con el formato requerido
              conexion: data.conexion,
              idtarea: tarea.descripcion.toString(), // Convertir a string para cumplir con el formato requerido
              fechaCumplimiento: data.fecha,
              hora: data.hora,
              cantidad: tarea.cantidad,
              observacion: data.observacion
            };
            console.log(tareaData);
            const item = await db.RegistrarTarea(tabla3, tareaData);
            result.push(item);
          }
      
          return result;
        } catch (error) {
          throw error;
        }
      }
  

    function ListarCertificaciones(data) {
      return db.ListarCertificaciones(tabla,tabla2, tabla3,tabla4,tabla5,tabla6,data);
    }
      
    function agregarTareas (body) {
      return db.agregar(tabla,body);
    }

    function agregarPrecioTarea (body) {
      return db.agregar(tabla2,body);
    }  

    function eliminar (body) {
        return db.eliminar(tabla,body);
    }

    function todosInner (){
        return db.todosInner(tabla,tabla2);
    }

    return{
    todos,
    uno,
    agregar,
    eliminar,
    todosInner,
    RegistrarTarea,
    agregarTareas,
    agregarPrecioTarea,
    ListarCertificaciones,
    sumatareas
    }
}