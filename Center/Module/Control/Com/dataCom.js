/**
 * Created with JetBrains WebStorm.
 * User: rube
 * Date: 3/1/14
 * Time: 10:28 PM
 * To change this template use File | Settings | File Templates.
 */
if (typeof (Global.moduleFile)=='undefined'){
    var moduleFile='/Center/Module';
} else {
    var moduleFile=Global.moduleFile;
}

var data=require(process.cwd()+moduleFile+"/Data");
exports.templateData=data.templateData;
exports.Assign=data.Assign;
exports.httpGET=data.httpGET;
exports.httpPOST=data.httpPOST;
exports.httpCOOKIE=data.httpCOOKIE;
exports.setHttpGET=data.setHttpGET;
exports.setHttpPOST=data.setHttpPOST;
exports.setHttpCOOKIE=data.setHttpCOOKIE;