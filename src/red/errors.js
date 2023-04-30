const respuestas = require('./respuestas')

function errors(err,req,res,next){
    console.error('[error',err);

    const message = err.message || 'error interno';
    const status = err.statuscode || 500;

    respuestas.error(req,res,message,status)
}

module.exports = errors;