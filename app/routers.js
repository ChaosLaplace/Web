//app/routers.js
const mysql = require('mysql');

var date = require('../things/date'); //自製時間格式
var crypto = require('../things/crypto'); //自製加解密格式
var mysql_db = require('./mysql'); //自製db格式

var params = {};

module.exports = function(app, log)
{
    //[get]
    app.get('/', function(req, res)
    {
        //Error: Can't set headers after they are sent -> res.send()/res.json(),最後都有res.end()
        console.log('Server Access Flash -> get /');

        if(req.session.user)
        {
            console.log('Session -> %s', JSON.stringify(req.session.user));

            res.render('login', {Date : date(), Session : 'Seesion -> ' + JSON.stringify(req.session.user)}); //載入index.ejs頁面
        }
        else
        {
            console.log('No Session');

            res.render('index', {Date : date(), Session : 'No Seesion'}); //載入index.ejs頁面
        }
    });
    //驗證session
    app.get('/sign', function(req, res)
    {
        //Error: Can't set headers after they are sent -> res.send()/res.json(),最後都有res.end()
        console.log('Server sign -> get /sign');

        //加密後存起來
        var user_session =
        {
            //user : crypto.encrypt(req.query.user),
            //password : crypto.encrypt(req.query.password)
            user : req.query.user,
            password : req.query.password
        };

        var mysql_select = select('Session', user_session.user, user_session.password);

        //查詢db是否有帳密
        if(Object.keys(params).length !== 0)
        {
            console.log('帳號已存在');
            console.log('params -> %s', JSON.stringify(params));
            res.redirect('/');
        }
        else
        {
            console.log('創帳號');
            console.log('params -> %s', JSON.stringify(params));
            req.session.user = user_session; //cookie紀錄connect.sid
            //mysql_db.INSERT('Session', user_session.user, user_session.password);
            res.render('mysql', {Date : date(), Session : '帳號已創建,請刷新頁面(F5)'});
            //req.query -> 獲取URL的參數串
            //res.render('confirm', {user : crypto.decrypt(user_session.user), password : crypto.decrypt(user_session.password)}); //載入confirm.ejs頁面
        }
    });
    //[GET] end

    //[post]
    //驗證session
    app.post('/confirm', function(req, res)
    {
        //Error: Can't set headers after they are sent -> res.send()/res.json(),最後都有res.end()
        console.log('Server confirm -> post /confirm');

        //req.body -> 獲取表單
        res.render('confirm', {user : req.body.user, password : req.body.password}); //載入get.ejs頁面   
    });
    //退出(刪除session)
    app.post('/logout', function(req, res)
    {
        //Error: Can't set headers after they are sent -> res.send()/res.json(),最後都有res.end()
        console.log('Server logout -> post /logout');

        req.session.destroy(function(err)
        {
            if(err)
            {
                log.error('退出失敗 -> ' + err);

                res.send(err);
            }

            console.log('session destroy');

            res.clearCookie();
            res.redirect('/');
        });
    });
    //[POST] end
    
    //沒有相符的路由
    app.use(function(req, res, next)
    {   
        log.error('沒有相符的路由 -> ' + req.path);

        res.render('no_app', {no_app : '沒有相符的路由'}); //載入no_app.ejs頁面

        next();
    });
};

function select(table, user, password)
{
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
                    params.user = rows[key].User;
                    params.password = rows[key].Password;

                    console.log('驗證成功');
                }
            }
        }
    });
}