/**
 * Created with JetBrains WebStorm.
 * User: rube
 * Date: 2/22/14
 * Time: 11:53 AM
 * To change this template use File | Settings | File Templates.
 */

var config=require('../Data/config');
var log=config.log;
var fs=require('fs');
var time=new Date();
var t=time.toLocaleDateString()+"-"+time.toLocaleTimeString();
function writeLog(content){
fs.appendFile(log,t+':'+content+'\n','utf-8',function(){});
}

exports.writeLog=writeLog;
