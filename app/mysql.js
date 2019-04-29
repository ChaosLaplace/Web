//app/mysql.js
const mysql = require('mysql');

var date = require('../things/date'); //自製時間格式

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

module.exports =
{
    connect : function()
    {
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
    },
    INSERT : function(table, user, password)
    {
        var insert_session = "INSERT INTO " + table + " (User, Password, create_time) VALUES ('" + user + "', '" + password + "', '" + date() + "')";

        connect_mysql.query(insert_session, function(err, result)
        {
            if(err) 
            { 
                console.log('[DB]mysql INSERT -> err');
                throw err;
            }
            else
            {
                console.log('[DB]mysql INSERT -> success');
                console.log('INSERT result -> %s', result);
            }
        });
    },
    SELECT : function(table)
    {
        var select_session = 'SELECT * FROM ' + table;

        connect_mysql.query(select_session, function(err, result)
        {
            if(err) 
            { 
                console.log('[DB]mysql SELECT -> err');
                throw err;
            }
            else
            {
                console.log('[DB]mysql SELECT -> success');
                console.log('SELECT result -> %s', result);
            }
        });
    }
};