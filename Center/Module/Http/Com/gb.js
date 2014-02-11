/**
 * Created with JetBrains WebStorm.
 * User: rube
 * Date: 2/6/14
 * Time: 9:59 PM
 * To change this template use File | Settings | File Templates.
 */
var path=require('path');
 exports.getContentType=function(filePath){
             var extName=path.extname(filePath);
             var contentType="";
             switch (extName)
             {
                 case ".html": contentType="text/html"; break;
                 case ".js": contentType="text/javascript"; break;
                 case ".css": contentType="text/css"; break;
                 case ".gif": contentType="image/gif"; break;
                 case ".jpg": contentType="image/jpeg"; break;
                 case ".png": contentType="image/png"; break;
                 case ".ico": contentType="image/icon"; break;
                 default: contentType="application/octet-stream";
             }
             return contentType;
         }

exports.isText=function(filePath){
             var extName=path.extname(filePath);
             var contentType=1;
             switch (extName)
             {
                 case ".html": contentType=1; break;
                 case ".js": contentType=1; break;
                 case ".css": contentType=1; break;
                 case ".gif": contentType=0; break;
                 case ".jpg": contentType=0; break;
                 case ".png": contentType=0; break;
                 case ".ico": contentType=0; break;
                 default: contentType=-1;
             }
             return contentType;
         }