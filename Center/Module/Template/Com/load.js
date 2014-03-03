/**
 * Created with JetBrains WebStorm.
 * User: rube
 * Date: 2/7/14
 * Time: 9:24 PM
 * To change this template use File | Settings | File Templates.
 */
var fs=require('fs');
function loadFile(fileName,fun){
    if (typeof(Global.filePath.templateFile)=='undefined') {
        var templateFile='/Center/Template';
    }  else {
        var templateFile=Global.filePath.templateFile;
    }
    fs.readFile(process.cwd()+templateFile+fileName+'.html','utf-8',function(err,data){
        if (err){

        } else {
            fun(data);
        }
    });
}

exports.loadFile=loadFile;