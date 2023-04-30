const db = require('../../DB/mysql');
const cntrl = require('./controlador');

module.exports = cntrl(db);