/**
 * Created with JetBrains WebStorm.
 * User: rube
 * Date: 2/7/14
 * Time: 11:20 AM
 * To change this template use File | Settings | File Templates.
 */
(function(){
    G=function(){};
    Global=new G;
    G.prototype.isExit=function(key){
        var obj=this[key];
        if (typeof(obj) == "undefined"){
            return false;
        }
        return true;
    }
    G.prototype.set=function(key,value){
        this[key]=value;
    }
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