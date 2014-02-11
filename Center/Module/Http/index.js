/**
 * Created with JetBrains WebStorm.
 * User: rube
 * Date: 2/6/14
 * Time: 5:09 PM
 * To change this template use File | Settings | File Templates.
 */
var http=require('http');
var route=require("./Com/route.js");
var cluster=require('cluster');
var numCPUs=require('os').cpus().length;
exports.doCreat=function(){
    if (cluster.isMaster){
        for (var i=0; i<numCPUs; i++){
            cluster.fork();
        }
    }  else {
        http.createServer(function(req, res) {
            route.doRoute(req,res);
        }).listen(3000);
    }
}