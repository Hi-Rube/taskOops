/**
 * Created with JetBrains WebStorm.
 * User: rube
 * Date: 2/7/14
 * Time: 9:39 PM
 * To change this template use File | Settings | File Templates.
 */
var template=require('./Com/templateCom.js');

exports.template=(function(){
    return {
       getTemplate:template.getTemplate,
       render:template.render
    }
})();
