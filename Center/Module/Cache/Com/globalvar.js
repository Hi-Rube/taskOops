/**
 * Created with JetBrains WebStorm.
 * User: rube
 * Date: 2/7/14
 * Time: 11:20 AM
 * To change this template use File | Settings | File Templates.
 */
(function(){
    Global=new Object();
})();

function isExist(key){
    var obj=Global[key];
    if (typeof(obj) == "undefined"){
        return false;
    }
    return true;
}

exports.setGlobalVar=function(key,value){
    Global[key]=value;
}