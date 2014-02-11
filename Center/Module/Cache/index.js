/**
 * Created with JetBrains WebStorm.
 * User: rube
 * Date: 2/7/14
 * Time: 11:19 AM
 * To change this template use File | Settings | File Templates.
 */
var globalvar=require('./Com/globalvar.js');
exports.globalvar=(function(){
        return {
            setGlobalVar:function(key,value){
                  globalvar.setGlobalVar(key,value);
            }
        }
})();