const app = require('./app');

app.listen(app.get('port'), () => {
    console.log('Servidor ok en el puerto',app.get("port"));
});