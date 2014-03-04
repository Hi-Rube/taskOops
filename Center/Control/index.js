/**
 * Created with JetBrains WebStorm.
 * User: rube
 * Date: 2/7/14
 * Time: 8:12 PM
 * To change this template use File | Settings | File Templates.
 */
if (typeof (Global.filePath.moduleFile)=='undefined'){
    var moduleFile='/Center/Module';
} else {
    var moduleFile=Global.filePath.moduleFile;
}
var control=require(process.cwd()+moduleFile+"/Control");

exports.action = (function(){
    return {
        index:function(req,res){
            /*control.template.getTemplate('/index',function(data){
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                res.end();
            });*/

            /*control.data.httpPOST(req,function(data){
                var str='{a:'+data.a+'}';
                res.end(str);
            });*/
            var d=control.data.httpGET(req);
            if (typeof d.a=='undefined'){
                d.a='err';
            }
            var str='{a:'+d.a+'}';
            res.end(str);
        },
        test:function(req,res){
            control.template.getTemplate('/test',function(data){
                var a=new control.data.Assign();
                a.set('dong','sad');
                a.set('yang',2);
                a.set('love',{url:'/index'});
                data=control.template.render(data, a.get());
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                res.end();
            });
           /* control.data.httpPOST(req,function(data){
                var str='{a:'+data.pwd+'}';
                console.log(str);
                res.end(str);
            });
            */
           /* var info=control.data.httpGET(req);
            res.end(info.a); */
        }
    }
})();



