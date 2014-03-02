/**
 * Created with JetBrains WebStorm.
 * User: rube
 * Date: 3/1/14
 * Time: 12:42 PM
 * To change this template use File | Settings | File Templates.
 */
var templateData=require('./Com/templateData');
var httpData=require('./Com/httpData');

exports.templateData=templateData.OP;
exports.Assign=templateData.Assign;
exports.httpGET=httpData.GET;
exports.httpPOST=httpData.POST;
exports.httpCOOKIE=httpData.COOKIE;
exports.setHttpGET=httpData.setGET;
exports.setHttpPOST=httpData.setPOST;
exports.setHttpCOOKIE=httpData.setCOOKIE;