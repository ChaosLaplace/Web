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
                console.log('[DB]mysql connect -> err');
                throw err;
            }
            else
            {
                console.log('[DB]mysql connect -> success');
                console.log(result);
            }

            console.log('[DB]mysql connect -> close');
            connect_mysql.end();
        });
    },
    SELECT : function(table)
    {
        var select_session = 'SELECT * FROM ' + table;

        connect_mysql.query(select_session, function(err, result)
        {
            if(err) 
            { 
                console.log('[DB]mysql connect -> err');
                throw err;
            }
            else
            {
                console.log('[DB]mysql connect -> success');
                console.log(result);
            }

            console.log('[DB]mysql connect -> close');
            connect_mysql.end();
        });
    }
};

/*
SET CHARSET utf8;

use node;
 
DROP TABLE IF EXISTS `Session`;

CREATE TABLE `Session`
(
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `User` longtext NOT NULL COMMENT '帳號',
  `Password` longtext NOT NULL COMMENT '密碼',
  `create_time` datetime NOT NULL COMMENT '作成日時',
  PRIMARY KEY (`id`)
)
ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
*/
