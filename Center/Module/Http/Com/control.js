/**
 * Created with JetBrains WebStorm.
 * User: rube
 * Date: 2/7/14
 * Time: 2:46 PM
 * To change this template use File | Settings | File Templates.
 */
var outgoing=require("./outgoing.js");
var fs=require('fs');
function doControl(parsedURL,req,res){
    if (typeof (Global.controlFile)=="undefined"){
        var controlFile="/Center/Control";
    }  else {
        var controlFile=Global.controlFile;
    }

    var route=parsedURL.pathname.split('/');
    if (route.length>3)
        outgoing.outError(req,res);
    if (route[1]==null || route[1]=='')
    var control='/index'; else var control='/'+route[1];
    if (route[2]==null || route[2]=='')
    var action='index'; else var action=route[2];
    var cFile=process.cwd()+controlFile+control+".js";

    fs.exists(cFile,function(exists){
        if (exists){
            var collection= require(cFile);
            var obj=eval('collection.action.'+action);
            if (typeof (obj)=='undefined'){
                outgoing.outError(req,res);
            } else {
                obj(req,res);
            }
        } else {
            outgoing.outError(req,res);
        }
    });
}

exports.doControl=doControl;