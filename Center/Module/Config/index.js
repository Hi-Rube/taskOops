/**
 * Created with JetBrains WebStorm.
 * User: rube
 * Date: 2/6/14
 * Time: 5:11 PM
 * To change this template use File | Settings | File Templates.
 */
var dataGet=require("./Com/dataGet.js");
module.exports={
    config:function(fun){dataGet.getAllDate(function(err,filecontent){
           if (err){

           } else {
             fun(filecontent);
           }
    })}
};