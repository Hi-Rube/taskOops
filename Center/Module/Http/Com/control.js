/**
 * Created with JetBrains WebStorm.
 * User: rube
 * Date: 2/7/14
 * Time: 2:46 PM
 * To change this template use File | Settings | File Templates.
 */
var outgoing=require("./outgoing.js");
var fs=require('fs');
var domain = require('domain');
//应用程序错误捕获
var catchError=domain.create();
catchError.on('error', function(e) {
    console.log("applicationException-->"+ e.stack+'--'+new Date().toLocaleDateString()+'-'+new Date().toLocaleTimeString());
});
function doControl(parsedURL,req,res){
    if (typeof (Global.filePath.controlFile)=="undefined"){
        var controlFile="/Center/Control";
    }  else {
        var controlFile=Global.filePath.controlFile;
    }

    var route=parsedURL.pathname.split('/');
    if (route.length>3) {
        outgoing.outError(req,res);
        return;
    }
    if (route[1]==null || route[1]=='')
    var control='/index'; else var control='/'+route[1];
    if (route[2]==null || route[2]=='')
    var action='index'; else var action=route[2];
    var cFile=process.cwd()+controlFile+control+".js";

    fs.exists(cFile,function(exists){
        if (exists){
            var collection= require(cFile);
            //应用执行异常抓取
             try{
                var obj=collection.action[action];

                if (typeof (obj)=='undefined'){
                    outgoing.outError(req,res);
                } else {
                    catchError.run(obj(req,res));
                }
             }catch (e){
               //console.log('applicationException-->'+ e.stack+'--'+new Date().toLocaleDateString()+'-'+new Date().toLocaleTimeString());
           }
        } else {
            outgoing.outError(req,res);
        }
    });
}

exports.doControl=doControl;