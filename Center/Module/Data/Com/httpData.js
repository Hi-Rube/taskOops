/**
 * Created with JetBrains WebStorm.
 * User: rube
 * Date: 3/1/14
 * Time: 9:54 PM
 * To change this template use File | Settings | File Templates.
 */
var querystring=require('querystring');
var URL=require('url');

/***
 * 获取GET请求参数
 * @param req   请求
 * @returns {*|Function|QueryStream.query|QueryStream.query|exports.query|exports.query|exports.query|exports.query|Socket.query|Url.query|query|Function|query|query|Function}
 * @constructor
 */
function GET(req){
    var info = URL.parse(req.url,true).query;
    return info;
}

/***
 * 获取POST请求参数 (需要监听所以以回调函数的形式返回)
 * @param req  请求
 * @param fun   回调函数 param:带参数信息的对象
 * @constructor
 */
function POST(req,fun){
    var info ='';
    req.addListener('data', function(chunk){
        info += chunk;
    });

    req.addListener('end', function(){
        info = querystring.parse(info);
        fun(info);
    })
}
exports.GET=GET;
exports.POST=POST;