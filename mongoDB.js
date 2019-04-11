/*
//MongoDB
var MongoClient = require('mongodb').MongoClient; //匯入MngoDB模塊
var collection; //宣告變數
//讓其他程式使用Cover function
module.exports = function DB(serverhost, table, CollectionName, cb)
{
    MongoClient.connect('mongodb://' + serverhost + table, function(err, DB)
    {
        if(DB)
        {
            console.log('DB Access Flash');
            console.log('DB -> ' + table);
            
            collection = DB.collection(CollectionName); //存放該資料表內容(Object)

            if(collection)
            {
                console.log('CollectionName -> ' + CollectionName);
                cb(collection); //回傳該資料表內容(Object)
            }
            else
            {
                console.log('No DB -> ' + table);
                console.log('No CollectionName -> ' + CollectionName);
                console.log('DB close');
                DB.close();
            }
        }
        else
        {
            console.log('err -> ' + err);
            console.log('DB close');
            DB.close();
        }
    });
}
*/
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/test', function(err, DB)
{
    if(DB)
    {
        console.log('DB Access Flash');
        console.log('DB close');
        DB.close();
    }
    else
    {
        console.log('err -> ' + err);
        console.log('DB close');
        DB.close();
    }
});