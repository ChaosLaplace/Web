//app/routers.js
var date = require('../things/date'); //自製時間格式
var crypto = require('../things/crypto'); //自製加解密格式
var mysql = require('./mysql'); //自製db格式

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

        var mysql_select = mysql.SELECT('Session', user_session.user, user_session.password);

        //查詢db是否有帳密
        if(mysql_select != {})
        {
            req.session.user = user_session; //cookie紀錄connect.sid
            console.log('帳號已存在');
            console.log('mysql_select -> %s', JSON.stringify(mysql_select));
            res.render('login', {Date : date(), Session : '帳號已存在 -> ' + JSON.stringify(req.session.user)}); //載入index.ejs頁面
        }
        else
        {
            console.log('創帳號');
            
            //mysql.INSERT('Session', user_session.user, user_session.password);
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
