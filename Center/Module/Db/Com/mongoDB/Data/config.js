/**
 * Created with JetBrains WebStorm.
 * User: rube
 * Date: 2/28/14
 * Time: 3:52 PM
 * To change this template use File | Settings | File Templates.
 */
var URI="mongodb://localhost:27017/team-test";
var log=process.cwd()+'/Center/Module/Db/Com/mongoDB/Data/mongoDb.log';
var opt={server: { poolSize: 4 }};
exports.URI=URI;
exports.log=log;
exports.opt=opt;