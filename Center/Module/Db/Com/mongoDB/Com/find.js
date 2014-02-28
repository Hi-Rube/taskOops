/**
 * Created with JetBrains WebStorm.
 * User: rube
 * Date: 2/22/14
 * Time: 11:51 AM
 * To change this template use File | Settings | File Templates.
 */
function find(model,conditions,fields,options,callback){
    if (typeof options.lean==undefined) options.lean = true;
    model.find(conditions,fields,options,callback);
}

function findOne(model,conditions,fields,options,callback){
    if (typeof options.lean==undefined) options.lean = true;
    model.findOne(conditions,fields,options,callback);
}

exports.find=find;
exports.findOne=findOne;