//app/mysql.js
const mysql = require('mysql');

const config =
{
    host: '35.201.129.44',
    user: 'root',
    password: 'mysql',
    database: 'node',
    port: 3306,
    ssl: true
};

const connect_mysql = new mysql.createConnection(config);

connect_mysql.connect(function(err)
{ 
    if(err) 
    { 
        console.log('[DB]mysql connect -> err');
        throw err;
    }
    else
    {
        console.log('[DB]mysql connect -> success');
    }

    console.log('[DB]mysql connect -> close');
    connect_mysql.end();
});