/**
 * Created with JetBrains WebStorm.
 * User: rube
 * Date: 3/1/14
 * Time: 9:54 PM
 * To change this template use File | Settings | File Templates.
 */
var util=require('util');

/***
 * 分配类 适合多个参数的加载
 * @constructor
 */
function Assign(){
   this.arr=new Object();
}

/***
 * 设置值
 * @param key
 * @param value
 */
Assign.prototype.set=function(key,value){
    this.arr[key]=value;
}

/***
 * 带错误机制 回调返回
 * @param fun
 */
Assign.prototype.return=function(fun){
     fun(util.format(this.arr));
}

/***
 * 无错误机制 直接返回
 * @returns {*}
 */
Assign.prototype.get=function(){
     return util.format(this.arr);
}

/***
 * 一个参数加载
 */
function OP(key,value){
    var v=new Object();
    v['key']=value;
    return util.format(v);
}

exports.OP=OP;
exports.Assign=Assign;

