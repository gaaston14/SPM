function error (message, code ){
    let e = new error(message);

    if(code){
        e.statuscode = code;
    }

    return e;
}