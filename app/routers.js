//app/routers.js
var date = require('../things/date'); //自製時間格式

module.exports = function(app)
{
    //[GET]
    app.get('/', function(req, res)
    {
        //Error: Can't set headers after they are sent -> res.send()/res.json(),最後都有res.end()
        console.log('[%s]Server Access Flash -> get /',  date());

        if(req.session.user)
        {
            console.log('Session -> %s', JSON.stringify(req.session.user));

            res.render('index', {Date : date(), Session : 'Seesion -> ' + JSON.stringify(req.session.user)}); //載入index.ejs頁面
        }
        else
        {
            console.log('No Session');

            res.render('index', {Date : date(), Session : 'No Seesion'}); //載入index.ejs頁面
        }
    });
    //驗證Session
    app.get('/confirm', function(req, res)
    {
        //Error: Can't set headers after they are sent -> res.send()/res.json(),最後都有res.end()
        console.log('[%s]Server Access Flash -> get /confirm',  date());

        var user_session =
        {
            user : req.query.user,
            password : req.query.password
        };
        
        //查詢DB是否有帳密
        if(user_session.user === 'root' && user_session.password === 'root')
        {
            req.session.user = user_session; //cookie紀錄connect.sid

            //req.query -> 獲取URL的參數串
            res.render('confirm', {user : user_session.user, password : user_session.password}); //載入get.ejs頁面
        }
        else
        {
            res.render('confirm', {user : null, password : null}); //載入get.ejs頁面
        }
    });
    //[GET] End

    //[POST]
    app.post('/confirm', function(req, res)
    {
        //Error: Can't set headers after they are sent -> res.send()/res.json(),最後都有res.end()
        console.log('[%s]Server Access Flash -> post /confirm',  date());

        //req.body -> 獲取表單
        res.render('confirm', {user : req.body.user, password : req.body.password}); //載入get.ejs頁面   
    });
    //[POST] End
    
    //沒有相符的路由
    app.use(function(req, res, next)
    {   
        res.render('no_app', {no_app : '沒有相符的路由'}); //載入no_app.ejs頁面

        next();
    });
};