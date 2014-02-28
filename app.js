/**
 * Created with JetBrains WebStorm.
 * User: rube
 * Date: 1/30/14
 * Time: 9:57 AM
 * To change this template use File | Settings | File Templates.
 */

var config=require(process.cwd()+"/Center/Module/Config/");
config.config(function(data){
    var filePath=JSON.parse(data[2]);
    var http=require(process.cwd()+filePath.moduleFile+"/Http/");
    var cache=require(process.cwd()+filePath.moduleFile+"/Cache/");
    //cache.globalvar.setGlobalVar("errorFile",'/Public/Static/4.png');
    http.doCreat();
});







