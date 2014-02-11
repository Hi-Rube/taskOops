/**
 * Created with JetBrains WebStorm.
 * User: rube
 * Date: 2/7/14
 * Time: 9:51 PM
 * To change this template use File | Settings | File Templates.
 */
if (typeof (Global.moduleFile)=='undefined'){
    var moduleFile='/Center/Module';
} else {
    var moduleFile=Global.moduleFile;
}

var Template=require(process.cwd()+moduleFile+"/Template");

function getTemplate(fileName,fun){
    Template.loadFile(fileName,fun);
}

function render(data,options){
    return Template.render(data,options);
}

exports.getTemplate=getTemplate;
exports.render=render;