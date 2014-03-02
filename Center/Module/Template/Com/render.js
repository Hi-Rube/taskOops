/**
 * Created with JetBrains WebStorm.
 * User: rube
 * Date: 2/7/14
 * Time: 10:36 PM
 * To change this template use File | Settings | File Templates.
 */
function render(data,value){
    data=data.replace(/<%=jd%>/,value);
    return data;
}

exports.render=function(data,options){
    var data=render(data,options);
    return data;
}