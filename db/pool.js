var mysql = require('mysql')
var pool = mysql.createPool(
    {
        host:'localhost',
        user:'root',
        password:'123456',
        database: 'test'
    }
)

module.exports = pool