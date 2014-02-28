/**
 * Created with JetBrains WebStorm.
 * User: rube
 * Date: 2/22/14
 * Time: 11:51 AM
 * To change this template use File | Settings | File Templates.
 */

/***
 * 插入数据
 * @param model 模型
 * @param KV    插入的值
 * @param callback    回调函数
 */
function insert(model,KV,callback){
   model.create(KV,callback);
}

/***
 * 插入数据不带回调函数(其实也可以有回调函数...嘻嘻)
 * @param model    模型
 * @param KV       插入的值
 * 两种新增方法区别在于，如果使用Model新增时，传入的对象只能是纯净的JSON对象，不能是由Model创建的实体，原因是：由Model创建的实体krouky虽然打印是只有{name:'krouky'}，但是krouky属于Entity，包含有Schema属性和Model数据库行为模型。如果是使用Model创建的对象，传入时一定会将隐藏属性也存入数据库，虽然3.x追加了默认严格属性，但也不必要增加操作的报错
 */
function insertNoBack(model,KV){
   var entity=new model(KV);
   entity.save();
}

exports.insert=insert;
exports.insertNoBack=insertNoBack;