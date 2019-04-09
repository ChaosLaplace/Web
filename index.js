const express = require('express');

const app_express = express();

var port = process.env.PORT || 8000; //環境變數(執行時給的外部參數PORT=?)或8080(同80,WWW代理服務,實現網頁瀏覽)

var server = app_express.listen(port, () => //listen EADDRINUSE 此錯誤為port已使用
{
    host = server.address().address;
    port = server.address().port;

    console.log('-----------------------------------------------------------');
    console.log(`Server Access Flash -> http://${host}:${port}`);
    console.log('-----------------------------------------------------------');
});

app_express.get('/', function(req, res)
{
    res.send('Access');
});

