/**
 * Created with JetBrains WebStorm.
 * User: rube
 * Date: 2/7/14
 * Time: 10:36 PM
 * To change this template use File | Settings | File Templates.
 */
function render(data,options){
    var str;
    for (var i=0; i<options.length; i++)
    {
    eval('str=/<%='+options[i].key+'%>/g');
    data=data.replace(str,options[i].value);
    }
    return data;
}

exports.render=function(data,options){
    var data=render(data,options);
    return data;
}