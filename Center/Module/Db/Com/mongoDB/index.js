var connection=require('./Com/connection');
var insert=require('./Com/insert');
var del=require('./Com/delete');
var update=require('./Com/update');
var find=require('./Com/find');
var common=require('./Com/common');
var Entity=require('./Com/entity');
var schema=require('./Data/Schema');

exports.connection=(function(){
    return {
        connectionByURI:connection.connectionByURI,
        connectionByParse:connection.connectionByParse
    }
})();

exports.insert=(function(){
    return {
        insert:insert.insert,
        insertNoBack:insert.insertNoBack
    }
})();

exports.delete=(function(){
    return {
        del:del.remove,
        delAll:del.removeAll
    }
})();

exports.update=(function(){
    return {
        update:update.update,
        updateAll:update.updateAll,
        updateByUpsert:update.updateByUpsert,
        findAndModify:update.findAndModify,
        updateFree:update.updateFree,
        updateByDelKey:update.updateByDelKey,
        updateArrayByDelAll:update.updateArrayByDelAll,
        updateArrayByDel:update.updateArrayByDel,
        updateArrayAll:update.updateArrayAll,
        updateArray:update.updateArray,
        updateByInc:update.updateByInc
    }
})();


exports.find=(function (){
    return {
        find:find.find,
        findOne:find.findOne
    }
})();

exports.Entity=Entity;


