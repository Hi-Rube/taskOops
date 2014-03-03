/**
 * Created with JetBrains WebStorm.
 * User: rube
 * Date: 2/7/14
 * Time: 1:49 PM
 * To change this template use File | Settings | File Templates.
 */
var fs=require('fs');
var gb=require("./gb.js");
function outError(req,res){
     if (typeof(Global.filePath.errorFile) == "undefined"){
         res.writeHead(404, {'Content-Type': 'text/html'});
         res.write("Error");
         res.end();
     } else {
         if (gb.isText(Global.filePath.errorFile)==1){
             fs.readFile(process.cwd()+Global.filePath.errorFile,'utf-8',function(err,data){
                 res.writeHead(200, {'Content-Type': 'text/html'});
                 res.write(data);
                 res.end();
             });
         } else if (gb.isText(Global.filePath.errorFile)==0){
             fs.readFile(process.cwd()+Global.filePath.errorFile,function(err,data){
                 res.writeHead(200, {'Content-Type': gb.getContentType(Global.filePath.errorFile)});
                 res.write(data);
                 res.end();
             });
         }
     }
}

function outData(pathName,req,res){
    if (typeof (Global.filePath.staticFile)=="undefined")
    {
        var staticFile="/Public/Static";
    }  else {
        var staticFile=Global.filePath.staticFile;
    }
    if (gb.isText(pathName)==1){
        fs.readFile(process.cwd()+staticFile+pathName,"utf-8",function(err,data){
            if (err){
                outError(req,res);
            } else {
                res.writeHead(200, {'Content-Type': gb.getContentType(pathName)});
                res.write(data);
                res.end();
            }
        });
    } else {
        fs.readFile(process.cwd()+staticFile+pathName,function(err,data){
            if (err){
                outError(req,res);
            } else {
                res.writeHead(200, {'Content-Type': gb.getContentType(pathName)});
                res.write(data);
                res.end();
            }
        });
    }
}

exports.outError=outError;
exports.outData=outData;