/**
 * Created with JetBrains WebStorm.
 * User: rube
 * Date: 2/7/14
 * Time: 8:12 PM
 * To change this template use File | Settings | File Templates.
 */
if (typeof (Global.moduleFile)=='undefined'){
    var moduleFile='/Center/Module';
} else {
    var moduleFile=Global.moduleFile;
}
var control=require(process.cwd()+moduleFile+"/Control");
var util=require('util');
var querystring=require('querystring');

exports.action = (function(){
    return {
        index:function(req,res){
            control.template.getTemplate('/index',function(data){
                var a=[1,3,4];
                var p=util.format(a);
                data=control.template.render(data,[{key:'lala',value:p}]);
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                res.end();
            });
        },
        test:function(req,res){
            var info ='';

            req.addListener('data', function(chunk){

                info += chunk;

            })

                .addListener('end', function(){

                    info = querystring.parse(info);

                    if(info.name == 'a' && info.pwd =='1'){

                        res.end('login success ' + info.name);

                    }else{

                        res.end('login failed ' + info.name);

                    }

                })
        }
    }
})();



