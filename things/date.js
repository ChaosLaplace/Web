//things/date.js
module.exports = function()
{
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
    var day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();
    var hour = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours();
    var minute = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes();
    var second = date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds();
    var date = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;

    return date;
}