//things/crypto.js
var crypto = require('crypto'); //加解密模塊

var key = 'Zero Two'; //註冊帳號的密鑰

module.exports =
{
	//加密
	encrypt : function(str)
	{
		var cipher = crypto.createCipher('aes192', key); //演算法, 密鑰
		var result = cipher.update(str, 'utf8', 'hex');

		result += cipher.final('hex');

		return result;
	},
	//解密
	decrypt : function (str)
	{
		var decipher = crypto.createDecipher('aes192', key);
		var result = decipher.update(str, 'hex', 'utf8');

		result += decipher.final('utf8');

		return result;
	}
};