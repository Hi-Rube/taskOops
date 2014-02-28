var mongoose=require("mongoose");
var common=require('./common');
/***
 * 根据URI地址直接连接数据库
 * @param URI   地址 eg:  mongodb://username:password@localhost:27017/db
 * @param opt   数据库连接参数
 * @returns {*}    返回db链接
 */
function connectionByURI(URI,opt){
     var db;
     db=mongoose.createConnection(URI,opt);
     db.on('error',function(err){common.writeLog(err)});
     return db;
}

/***
 * 根据URI地址直接连接数据库
 * @param parse   地址参数parse  username用户名  password密码 hostname:地址 port:端口 db:数据库名称
 * @param opt   数据库连接参数
 * @returns {*}    返回db链接
 */
function connectionByParse(parse,opt){
    if (typeof (parse.username)=='undefined' || parse.username==''){
        var ait='';
        var mao='';
        parse.username='';
        parse.password='';
    }
    else {
        var ait='@';
        var mao=':'
    }

    var URI="mongodb://"+parse.username+mao+parse.password+ait+parse.hostname+':'+parse.port+'/'+parse.db;
    var db=mongoose.createConnection(URI,opt);
    db.on('error',function(err){common.writeLog(err)});
    return db;
}


exports.connectionByURI=connectionByURI;
exports.connectionByParse=connectionByParse;
