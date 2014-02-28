/**
 * Created with JetBrains WebStorm.
 * User: rube
 * Date: 2/22/14
 * Time: 11:51 AM
 * To change this template use File | Settings | File Templates.
 */

/***
 * 执行删除操作
 * @param model 模型
 * @param KV    参数
 * @param callback  回调函数
 */
function remove(model,KV,callback){
    model.remove(KV,callback);
}

/***
 * 删除整个集合数据
 * @param model  模型
 * @param callback  回调函数
 */
function removeAll(model,callback){
    model.remove({},callback);
}

exports.remove=remove;
exports.removeAll=removeAll;
