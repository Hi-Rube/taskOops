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

exports.action = (function(){
    return {
        index:function(req,res){
            control.template.getTemplate('/index',function(data){
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                res.end();
            });
        },
        test:function(req,res){
            control.template.getTemplate('/test',function(data){
                var a=new control.data.Assign();
                a.set('dong',1);
                a.set('yang',2);
                a.set('love',{dong:'loveyan'});
                data=control.template.render(data, a.get());
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                res.end();
            });
        }
    }
})();



