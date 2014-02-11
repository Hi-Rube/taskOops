/**
 * Created with JetBrains WebStorm.
 * User: rube
 * Date: 2/6/14
 * Time: 10:14 PM
 * To change this template use File | Settings | File Templates.
 */
var url=require('url');
var path=require('path');
var outgoing=require("./outgoing.js");
var control=require("./control.js");
exports.doRoute=function(req,res){
      var parsedURL=url.parse(req.url,true);
      var pathName=parsedURL.pathname;
      if (path.extname(pathName)==""){
          control.doControl(parsedURL,req,res);
      } else {
          outgoing.outData(pathName,req,res);
      }
}