/*
NodeJS 應用程式開發框架(Web Application Framework)
環境(Node.js + Express + Ejs + Ajax + jQuery + MySQL + GitHub)

0.各種安裝
有寫手冊

1.forever使用(到要執行檔案的資料夾)
//監聽index.js(日誌a + 自動重啟w)
forever start --uid 'index' --a --w index.js
forever stop --uid 'index' --a --w index.js
*/
//index.js
var express = require('express'); //express架構模塊
var bodyParser = require('body-parser'); //middleware(中介軟體),後端用來解析post到body的資料
var cookieParser = require('cookie-parser'); //cookie
var session = require('express-session'); //session
//var redis = require('redis'); //redis內存資料庫
//var redisStore = require('connect-redis')(session); //connect-redis -> session儲存器

var routers = require('./app/routers'); //自製路由
var date = require('./things/date'); //自製時間格式

var app = express(); //產生express物件
//var redisClient = redis.createClient(); //產生redisClient客戶端
var port = process.env.PORT || 3000; //環境變數(執行時給的外部參數PORT=?)或8080(同80,WWW代理服務,實現網頁瀏覽)
var key = 'Omatase'; //密鑰設定
var secret =
{
    //store : new redisStore({client : redisClient}),
    cookie : {maxAge : 30 * 1000}, //過期時間(ms)
    secret : key,
    resave : true,
    saveUninitialized : true
}; //session設定

app.set('view engine', 'ejs'); //模板引擎ejs
app.set('views', __dirname + '/views'); //模板檔案路徑

app.use('/images', express.static(__dirname + '/images')); //虛擬路徑,實體路徑(存放靜態物件)
app.use(bodyParser.urlencoded()); //解析文本格式,默認使用UTF-8 && {extended : true}
app.use(bodyParser.json()); //解析json格式
app.use(cookieParser(key)); //給cookie密鑰
app.use(session(secret)); //使用session設定

routers(app); //載入所有路由(傳app過去讓routers.js使用)

//啟動server
var server = app.listen(port, function() //listen EADDRINUSE 此錯誤為port已占用
{
    var serverhost = server.address().address;
    var serverport = server.address().port;

    console.log('-----------------------------------------------------------------------');
    console.log('[%s]Server Access Flash -> http://%s:%s', date(), serverhost, serverport);
    console.log('-----------------------------------------------------------------------');
});
