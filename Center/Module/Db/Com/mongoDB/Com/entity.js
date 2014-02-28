/**
 * Created with JetBrains WebStorm.
 * User: rube
 * Date: 2/22/14
 * Time: 1:28 PM
 * To change this template use File | Settings | File Templates.
 */
var connection=require('./connection');
var insert=require('./insert');
var del=require('./delete');
var update=require('./update');
var find=require('./find');
var common=require('./common');
var schema=require('../Data/Schema');
var config=require('../Data/config');
var mongoose=require("mongoose");

/***
 * Entity的构造方法
 */
function newEntity(method,parse,opt){
    if (typeof config.URI!=undefined) parse=config.URI;
    if (typeof config.opt!=undefined) opt=config.opt;
    if (method==0) this.db=connection.connectionByParse(parse,opt);
        else this.db=connection.connectionByURI(parse,opt);
    for (var i=0; i<schema.schemaArray.length; i++)
    eval("this."+schema.schemaArrayName[i]+"="+'new behavior(schema.schemaArrayName[i],schema.schemaArray[i],this.db)');
    this.schemaArray=schema.schemaArray;
    this.schemaArrayName=schema.schemaArrayName;
}


/***
 * 一个数据库操作类
 * @param method 链接数据库的方式  >1 URI连接 0 参数方式链接 default:URI链接
 * @param parse  参数  (地址参数 || URI 地址)
 * @param opt    服务器链接参数
 * @constructor
 */
function Entity(method,parse,opt){
      newEntity.call(this,method,parse,opt);
}

Entity.prototype.close=function(){
    this.db.close();
}

Entity.prototype.writeError=function(content){
    common.writeLog(content);
}
/***
 * 提供数据库的操作行为集合
 */
function behavior(N,S,db){
     this.model=db.model(N,S,N);
}

behavior.prototype.insert=function(KV,callback){
     insert.insert(this.model,KV,callback);
}

behavior.prototype.insertNoBack=function(KV){
    insert.insertNoBack(this.model,KV);
}

behavior.prototype.delete=function(KV,callback){
     del.remove(this.model,KV,callback);
}

behavior.prototype.deleteAll=function(callback){
     del.removeAll(this.model,callback);
}

behavior.prototype.update=function(conditions,content,callback){
     update.update(this.model,conditions,content,callback);
}

behavior.prototype.updateAll=function(conditions,content,callback){
    update.updateAll(this.model,conditions,content,callback);
}

behavior.prototype.updateByUpsert=function(conditions,content,callback){
    update.updateByUpsert(this.model,conditions,content,callback);
}

behavior.prototype.findAndModify=function(query,sort,content,options,callback){
    update.findAndModify(this.model,query,sort,content,options,callback);
}

behavior.prototype.updateFree=function(condition,content,options,callback){
    update.updateFree(this.model,condition,content,options,callback);
}

behavior.prototype.updateByDelKey=function(conditions,key,callback){
    update.updateByDelKey(this.model,conditions,key,callback);
}

behavior.prototype.updateArrayAll=function(conditions,content,callback){
    update.updateArrayAll(this.model,conditions,content,callback);
}

behavior.prototype.updateArray=function(conditions,content,callback){
    update.updateArray(this.model,conditions,content,callback);
}

behavior.prototype.updateArrayByDel=function(conditions,content,callback){
    update.updateArrayByDel(this.model,conditions,content,callback);
}

behavior.prototype.updateArrayByDelAll=function(conditions,content,callback){
    update.updateArrayByDelAll(this.model,conditions,content,callback);
}

behavior.prototype.updateByInc=function(conditions,content,callback){
    update.updateByInc(this.model,conditions,content,callback);
}

behavior.prototype.find=function(conditions,fields,options,callback){
    find.find(this.model,conditions,fields,options,callback);
}

behavior.prototype.findOne=function(conditions,fields,options,callback){
    find.findOne(this.model,conditions,fields,options,callback);
}

behavior.prototype.getModel=function(){
    return this.model;
}

behavior.prototype.getModelCollection=function(){
    return this.model.collection;
}

behavior.prototype.setMethod=function(methodName,method){
    eval("this.model.statics."+methodName+"=method");
}


module.exports=Entity;