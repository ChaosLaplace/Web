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
                console.log('INSERT result -> %s', JSON.stringify(result));
            }
        });
    },
    SELECT : function(table, user, password)
    {
        var select_session = 'SELECT User,Password FROM ' + table;

        connect_mysql.query(select_session, function(err, rows, fields)
        {
            if(err) 
            { 
                console.log('[DB]mysql SELECT -> err');
                throw err;
            }
            else
            {
                console.log('[DB]mysql SELECT -> success');

                for(key in rows)
                {
                    console.log(rows[key].User + ',' + rows[key].Password);
                    console.log('rows[%s] -> %s', key, JSON.stringify(rows[key]));

                    if(rows[key].User === user && rows[key].Password === password)
                    {
                        console.log('驗證成功');

                        return res.send('帳號 -> $s && 密碼 -> %s', rows[key].User, rows[key].Password);
                    }
                }
            }
        });
    }
};