if (typeof (Global.filePath.moduleFile)=='undefined'){
    var moduleFile='/Center/Module';
} else {
    var moduleFile=Global.filePath.moduleFile;
}

var Db=require(process.cwd()+moduleFile+"/Db");

//mongo 为数据库映射实体
exports.mongo=Db.mongo;
exports.mongoDb=Db.mongoDb;