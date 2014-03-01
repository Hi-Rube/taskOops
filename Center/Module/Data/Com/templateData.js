/**
 * Created with JetBrains WebStorm.
 * User: rube
 * Date: 3/1/14
 * Time: 9:54 PM
 * To change this template use File | Settings | File Templates.
 */
var util=require('util');

/***
 * 分配类
 * @constructor
 */
function Assign(){
    this.keyArray=new Array();
    this.valueArray=new Array();
}

/***
 * 设置值
 * @param key
 * @param value
 */
Assign.prototype.set=function(key,value){
    this.keyArray.push(key);
    if (value!=null)
    this.valueArray.push(value);
}

/***
 * 带错误机制 回调返回
 * @param fun
 */
Assign.prototype.return=function(fun){
     var objectArray=OP(this.keyArray,this.valueArray);
     if (objectArray==-1) {
         fun('Error:KV array length does not match!',null)
     }  else fun(0,objectArray);
}

/***
 * 无错误机制 直接返回
 * @returns {*}
 */
Assign.prototype.get=function(){
     return OP(this.keyArray,this.valueArray);
}

/***
 * 操作集成
 */
function OP(keyArray,valueArray){
    var checkBack=check(keyArray,valueArray);
    if (checkBack==-1){
        return -1;
    } else return setData(keyArray,valueArray,checkBack);
}

/***
 * 数据处理
 * @param keyArray 键数组
 * @param valueArray  值数组
 * @returns {Array}    render对象数组参数
 */
function setData(keyArray,valueArray,length){
    var i;
    var format=util.format;
    var objectArray=new Array();
    for (i=0; i<length; i++)
    {
        var object=new Object();
        object.key=keyArray[i];
        object.value=format(valueArray[i]);
        objectArray.push(object);
    }
    return objectArray;
}

/***
 * 数据检测
 * @param keyArray
 * @param valueArray
 */
function check(keyArray,valueArray){
    var length=keyArray.length;
    if (length!=valueArray.length){
        return -1;
    } else return length;
}

exports.OP=OP;
exports.Assign=Assign;

