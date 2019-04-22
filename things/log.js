//things/log.js
var log4js = require('log4js'); //log4js模塊

log4js.configure(
{
  appenders :
  {
    info : {type : 'file', filename : 'logs/info.log'},
    error : {type : 'file', filename : 'logs/error.log'},
    test : {type : 'file', filename : 'logs/test.log'}
  },
  categories :
  {
    log_info : {appenders : ['info'], level : 'info'},
    log_error : {appenders : ['error'], level : 'error'},
    log_test : {appenders : ['test'], level : 'info'},
    default : {appenders : ['info', 'error', 'test'], level : 'info'}
  }
}); //log參數設定

var loginfo = log4js.getLogger('log_info');
var logerror = log4js.getLogger('log_error');
var logtest = log4js.getLogger('log_test');

module.exports =
{
  info : function(text)
  {
    loginfo.info(text);
  },
  error : function(text)
  {
    logerror.error(text);
  },
  test : function(text)
  {
    logtest.info(text);
  }
};