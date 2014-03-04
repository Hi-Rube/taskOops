/**
 * Created with JetBrains WebStorm.
 * User: rube
 * Date: 3/3/14
 * Time: 11:03 PM
 * To change this template use File | Settings | File Templates.
 */
var http=require('http');
var route=require("./route.js");
var cluster=require('cluster');
var numCPUs=require('os').cpus().length;
var cp=require('child_process');
if (typeof Global.httpConfig.port=='undefined'){
   var port=3000;
}  else {
    var port=Global.httpConfig.port;
}
exports.doCreat=function(){
    /***
     * 异常捕获做后一道关卡
     */
    process.on('uncaughtException',function(err){
        console.log('uncaughtException-->'+err.stack+'--'+new Date().toLocaleDateString()+'-'+new Date().toLocaleTimeString());
        process.exit();
    });
    if (cluster.isMaster){
        for (var i=0; i<numCPUs; i++){
            cluster.fork();
        }
    }  else {
        http.createServer(function(req, res) {
            route.doRoute(req,res);
        }).listen(port);
    }
}