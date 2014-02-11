/**
 * Created with JetBrains WebStorm.
 * User: rube
 * Date: 2/6/14
 * Time: 6:40 PM
 * To change this template use File | Settings | File Templates.
 */
var fs=require('fs');
var path=process.cwd()+"/Center/Module/Config/Data";
exports.getAllDate=function(fun){
    fs.readdir(path,function(err,files){
         var count=files.length;
         var fileContent=new Array(count+2);
             fileContent[1]=new Array(count);
         for (var i=0; i<count; i++)
         {
             fileContent[i+2]=getFileContent(path+"/"+files[i],null,"sync");
         }
        fileContent[0]=count;
        fileContent[1]=files;
        fun(err,fileContent);
    })
}

/***
 * 获取各种文件存储目录的配置信息
 * @param fun 回调函数
 * @returns {*}
 */
exports.getFilePath=function(fun){
    return getFileContent(path+"/filePath.json",fun);
}

/***
 * 获取相应文件内容
 * @param path 文件路径
 * @param fun 回调函数
 * @returns {同步调用是返回文件内容}
 */
function getFileContent(path,fun,method){
    if (method=="sync"){
        return fs.readFileSync(path,'utf-8');
    } else {
        fs.readFile(path,'utf-8',function(err,data){
            fun(err,data);
        });
    }
}