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

/***
 * 获取HTTP请求的COOKIE数据
 * @param req      请求
 * @returns {*}
 * @constructor
 */
function COOKIE(req){
    if (typeof req.headers.cookie==undefined) return false;
    return querystring.parse(req.headers.cookie);
}

/***
 * Cookie 设置类
 */
function setCOOKIE(){
    this.cookieArr=new Array();
}

/***
 * 设置COOKIE
 * @param name 键
 * @param value  值
 * @param expires  过期时间,秒
 * @param path     目录
 * @param domain   域名
 */
setCOOKIE.prototype.set=function (name, value, expires, path, domain){
    var cookieStr = '';
    cookieStr = name + '=' + value + ';';
    //cookie有效期时间
    if (expires != undefined) {
        expires = parseInt(expires);
        var today = new Date();
        var time = today.getTime() + expires * 1000;
        var new_date = new Date(time);
        var expiresDate = new_date.toGMTString(); //转换成GMT 格式。
        cookieStr += 'expires=' +  expiresDate + ';';
    }
    //目录
    if (path != undefined) {
        cookieStr += 'path=' +  path + ';';
    }
    //域名
    if (domain != undefined) {
        cookieStr += 'domain=' +  domain + ';';
    }
    this.cookieArr.push(cookieStr);
}

/***
 * 删除对应的cookie
 * @param name
 */
setCOOKIE.prototype.del=function(name){
    this.set(name,'',-1000);
}

/***
 * 回调的方式返回设置了COOKIE的响应
 * @param res    响应
 * @param fun    回调函数
 */
setCOOKIE.prototype.return=function(res,fun){
    res.setHeader("Set-Cookie",this.cookieArr);
    fun(res);
}

/***
 * 无回调的方式直接获取设置了COOKIE的响应
 * @param res      响应
 * @returns {*}
 */
setCOOKIE.prototype.get=function(res){
    res.setHeader("P3P","CP=CAO PSA OUR");          //设置ie隐私，接受所有cookie解决IE无法接受COOKIE的问题
    res.setHeader("Set-Cookie",this.cookieArr);
    return res;
}



function setGET(){}
function setPOST(){}
exports.GET=GET;
exports.POST=POST;
exports.COOKIE=COOKIE;
exports.setGET=setGET;
exports.setPOST=setPOST;
exports.setCOOKIE=setCOOKIE;