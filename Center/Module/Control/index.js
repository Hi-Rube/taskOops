/**
 * Created with JetBrains WebStorm.
 * User: rube
 * Date: 2/7/14
 * Time: 9:39 PM
 * To change this template use File | Settings | File Templates.
 */
var template=require('./Com/templateCom');
var Db=require('./Com/dbCom');
var data=require('./Com/dataCom');
exports.template=(function(){
    return {
       getTemplate:template.getTemplate,     //模板获取
       render:template.render                //模板参数传递
    }
})();

exports.mongoDb=Db.mongoDb;                 //mongoDb 操作集合 即var mongodb

exports.mongo=Db.mongo;                     //mongoDb 操作实例

exports.data=(function(){
    return {
        templateData:data.templateData,
        Assign:data.Assign,
        httpGET:data.httpGET,
        httpPOST:data.httpPOST,
        httpCOOKIE:data.httpCOOKIE,
        setHttpGET:data.setHttpGET,
        setHttpPOST:data.setHttpPOST,
        setHttpCOOKIE:data.setHttpCOOKIE
    }
})();