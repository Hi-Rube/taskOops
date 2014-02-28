/**
 * Created with JetBrains WebStorm.
 * User: rube
 * Date: 2/22/14
 * Time: 11:51 AM
 * To change this template use File | Settings | File Templates.
 */

/***
 * 单个更新
 * @param model 模型
 * @param conditions  更新目标
 * @param content     更新内容
 * @param callback    回调函数
 */
function update(model,conditions,content,callback){
    model.update(conditions,{$set:content},callback);
}

/***
 * 全部更新
 * @param model 模型
 * @param conditions  更新目标
 * @param content     更新内容
 * @param callback    回调函数
 */
function updateAll(model,conditions,content,callback){
    model.update(conditions,{$set:content},{multi:true},callback)
}

function updateFree(model,conditions,content,options,callback){
    model.update(conditions,content,options,callback);
}

function updateByDelKey(model,conditions,key,callback){
    model.update(conditions,{$unset:key},callback);
}

function updateByInc(model,conditions,key,callback){
    model.update(conditions,{$inc:key},callback);
}

function updateByUpsert(model,conditions,content,callback){
    model.update(conditions,{$set:content},{upsert:true},callback);
}

function updateArray(model,conditions,content,callback){
    model.update(conditions,{$push:content},callback);
}

function updateArrayAll(model,conditions,content,callback){
    model.update(conditions,{$pushAll:content},callback);
}

function updateArrayByDel(model,conditions,key,callback){
    model.update(conditions,{$pull:key},callback);
}

function updateArrayByDelAll(model,conditions,key,callback){
    model.update(conditions,{$pullAll:key},callback);
}

function findAndModify(model,query, sort, content, options, callback){
    model.collection.findAndModify(query,sort,content,options,callback);
}

exports.update=update;
exports.updateAll=updateAll;
exports.updateByUpsert=updateByUpsert;
exports.findAndModify=findAndModify;
exports.updateFree=updateFree;
exports.updateByDelKey=updateByDelKey;
exports.updateArrayByDelAll=updateArrayByDelAll;
exports.updateArrayByDel=updateArrayByDel;
exports.updateArrayAll=updateArrayAll;
exports.updateArray=updateArray;
exports.updateByInc=updateByInc;