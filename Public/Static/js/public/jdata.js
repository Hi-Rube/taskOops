/**
 * Created with JetBrains WebStorm.
 * User: rube
 * Date: 3/1/14
 * Time: 12:29 AM
 * To change this template use File | Settings | File Templates.
 * JData - JData Engine
 */


//ArtTemplate
(function (global) {

    'use strict';

    /**
     * 模板引擎
     * 若第二个参数类型为 String 则执行 compile 方法, 否则执行 render 方法
     * @name    template
     * @param   {String}            模板ID
     * @param   {Object, String}    数据或者模板字符串
     * @return  {String, Function}  渲染好的HTML字符串或者渲染方法
     */
    var template = function (id, content) {
        return template[
            typeof content === 'string' ? 'compile' : 'render'
            ].apply(template, arguments);
    };


    template.version = '2.0.4';
    template.openTag = '<?JD';     // 设置逻辑语法开始标签
    template.closeTag = '?>';    // 设置逻辑语法结束标签
    template.isEscape = true;    // HTML字符编码输出开关
    template.isCompress = false; // 剔除渲染后HTML多余的空白开关
    template.parser = null;      // 自定义语法插件接口



    /**
     * 渲染模板
     * @name    template.render
     * @param   {String}    模板ID
     * @param   {Object}    数据
     * @return  {String}    渲染好的HTML字符串
     */
    template.render = function (id, data) {

        var cache = template.get(id) || _debug({
            id: id,
            name: 'Render Error',
            message: 'No Template'
        });

        return cache(data);
    };



    /**
     * 编译模板
     * 2012-6-6 @TooBug: define 方法名改为 compile，与 Node Express 保持一致
     * @name    template.compile
     * @param   {String}    模板ID (可选，用作缓存索引)
     * @param   {String}    模板字符串
     * @return  {Function}  渲染方法
     */
    template.compile = function (id, source) {

        var params = arguments;
        var isDebug = params[2];
        var anonymous = 'anonymous';

        if (typeof source !== 'string') {
            isDebug = params[1];
            source = params[0];
            id = anonymous;
        }


        try {

            var Render = _compile(id, source, isDebug);

        } catch (e) {

            e.id = id || source;
            e.name = 'Syntax Error';

            return _debug(e);

        }


        function render (data) {

            try {

                return new Render(data, id) + '';

            } catch (e) {

                if (!isDebug) {
                    return template.compile(id, source, true)(data);
                }

                return _debug(e)();

            }

        }


        render.prototype = Render.prototype;
        render.toString = function () {
            return Render.toString();
        };


        if (id !== anonymous) {
            _cache[id] = render;
        }


        return render;

    };



    var _cache = template.cache = {};




// 辅助方法集合
    var _helpers = template.helpers = (function () {

        var toString = function (value, type) {

            if (typeof value !== 'string') {

                type = typeof value;
                if (type === 'number') {
                    value += '';
                } else if (type === 'function') {
                    value = toString(value.call(value));
                } else {
                    value = '';
                }
            }

            return value;

        };


        var escapeMap = {
            "<": "&#60;",
            ">": "&#62;",
            '"': "&#34;",
            "'": "&#39;",
            "&": "&#38;"
        };


        var escapeHTML = function (content) {
            return toString(content)
                .replace(/&(?![\w#]+;)|[<>"']/g, function (s) {
                    return escapeMap[s];
                });
        };


        var isArray = Array.isArray || function (obj) {
            return ({}).toString.call(obj) === '[object Array]';
        };


        var each = function (data, callback) {
            if (isArray(data)) {
                for (var i = 0, len = data.length; i < len; i++) {
                    callback.call(data, data[i], i, data);
                }
            } else {
                for (i in data) {
                    callback.call(data, data[i], i);
                }
            }
        };


        return {

            $include: template.render,

            $string: toString,

            $escape: escapeHTML,

            $each: each

        };
    })();




    /**
     * 添加模板辅助方法
     * @name    template.helper
     * @param   {String}    名称
     * @param   {Function}  方法
     */
    template.helper = function (name, helper) {
        _helpers[name] = helper;
    };




    /**
     * 模板错误事件
     * @name    template.onerror
     * @event
     */
    template.onerror = function (e) {
        var message = 'Template Error\n\n';
        for (var name in e) {
            message += '<' + name + '>\n' + e[name] + '\n\n';
        }

        if (global.console) {
            console.error(message);
        }
    };







// 获取模板缓存
    template.get = function (id) {

        var cache;

        if (_cache.hasOwnProperty(id)) {
            cache = _cache[id];
        } else if ('document' in global) {
            var elem = document.getElementById(id);

            if (elem) {
                var source = elem.value || elem.innerHTML;
                cache = template.compile(id, source.replace(/^\s*|\s*$/g, ''));
            }
        }

        return cache;
    };



// 模板调试器
    var _debug = function (e) {

        template.onerror(e);

        return function () {
            return '{Template Error}';
        };
    };



// 模板编译器
    var _compile = (function () {


        // 数组迭代
        var forEach = _helpers.$each;


        // 静态分析模板变量
        var KEYWORDS =
            // 关键字
            'break,case,catch,continue,debugger,default,delete,do,else,false'
                + ',finally,for,function,if,in,instanceof,new,null,return,switch,this'
                + ',throw,true,try,typeof,var,void,while,with'

                // 保留字
                + ',abstract,boolean,byte,char,class,const,double,enum,export,extends'
                + ',final,float,goto,implements,import,int,interface,long,native'
                + ',package,private,protected,public,short,static,super,synchronized'
                + ',throws,transient,volatile'

                // ECMA 5 - use strict
                + ',arguments,let,yield'

                + ',undefined';

        var REMOVE_RE = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|[\s\t\n]*\.[\s\t\n]*[$\w\.]+/g;
        var SPLIT_RE = /[^\w$]+/g;
        var KEYWORDS_RE = new RegExp(["\\b" + KEYWORDS.replace(/,/g, '\\b|\\b') + "\\b"].join('|'), 'g');
        var NUMBER_RE = /^\d[^,]*|,\d[^,]*/g;
        var BOUNDARY_RE = /^,+|,+$/g;

        var getVariable = function (code) {
            return code
                .replace(REMOVE_RE, '')
                .replace(SPLIT_RE, ',')
                .replace(KEYWORDS_RE, '')
                .replace(NUMBER_RE, '')
                .replace(BOUNDARY_RE, '')
                .split(/^$|,+/);
        };


        return function (id, source, isDebug) {

            var openTag = template.openTag;
            var closeTag = template.closeTag;
            var parser = template.parser;


            var code = source;
            var tempCode = '';
            var line = 1;
            var uniq = {$data:1,$id:1,$helpers:1,$out:1,$line:1};
            var prototype = {};


            var variables = "var $helpers=this,"
                + (isDebug ? "$line=0," : "");

            var isNewEngine = ''.trim;// '__proto__' in {}
            var replaces = isNewEngine
                ? ["$out='';", "$out+=", ";", "$out"]
                : ["$out=[];", "$out.push(", ");", "$out.join('')"];

            var concat = isNewEngine
                ? "$out+=$text;return $text;"
                : "$out.push($text);";

            var print = "function($text){" + concat + "}";

            var include = "function(id,data){"
                +     "data=data||$data;"
                +     "var $text=$helpers.$include(id,data,$id);"
                +     concat
                + "}";


            // html与逻辑语法分离
            forEach(code.split(openTag), function (code) {
                code = code.split(closeTag);

                var $0 = code[0];
                var $1 = code[1];

                // code: [html]
                if (code.length === 1) {

                    tempCode += html($0);

                    // code: [logic, html]
                } else {

                    tempCode += logic($0);

                    if ($1) {
                        tempCode += html($1);
                    }
                }


            });



            code = tempCode;


            // 调试语句
            if (isDebug) {
                code = "try{" + code + "}catch(e){"
                    +       "throw {"
                    +           "id:$id,"
                    +           "name:'Render Error',"
                    +           "message:e.message,"
                    +           "line:$line,"
                    +           "source:" + stringify(source)
                    +           ".split(/\\n/)[$line-1].replace(/^[\\s\\t]+/,'')"
                    +       "};"
                    + "}";
            }


            code = variables + replaces[0] + code
                + "return new String(" + replaces[3] + ");";


            try {

                var Render = new Function("$data", "$id", code);
                Render.prototype = prototype;

                return Render;

            } catch (e) {
                e.temp = "function anonymous($data,$id) {" + code + "}";
                throw e;
            }




            // 处理 HTML 语句
            function html (code) {

                // 记录行号
                line += code.split(/\n/).length - 1;

                // 压缩多余空白与注释
                if (template.isCompress) {
                    code = code
                        .replace(/[\n\r\t\s]+/g, ' ')
                        .replace(/<!--.*?-->/g, '');
                }

                if (code) {
                    code = replaces[1] + stringify(code) + replaces[2] + "\n";
                }

                return code;
            }


            // 处理逻辑语句
            function logic (code) {

                var thisLine = line;

                if (parser) {

                    // 语法转换插件钩子
                    code = parser(code);

                } else if (isDebug) {

                    // 记录行号
                    code = code.replace(/\n/g, function () {
                        line ++;
                        return "$line=" + line +  ";";
                    });

                }


                // 输出语句. 转义: <%=value%> 不转义:<%=#value%>
                // <%=#value%> 等同 v2.0.3 之前的 <%==value%>
                if (code.indexOf('=') === 0) {

                    var isEscape = !/^=[=#]/.test(code);

                    code = code.replace(/^=[=#]?|[\s;]*$/g, '');

                    if (isEscape && template.isEscape) {

                        // 转义处理，但排除辅助方法
                        var name = code.replace(/\s*\([^\)]+\)/, '');
                        if (
                            !_helpers.hasOwnProperty(name)
                                && !/^(include|print)$/.test(name)
                            ) {
                            code = "$escape(" + code + ")";
                        }

                    } else {
                        code = "$string(" + code + ")";
                    }


                    code = replaces[1] + code + replaces[2];

                }

                if (isDebug) {
                    code = "$line=" + thisLine + ";" + code;
                }

                getKey(code);

                return code + "\n";
            }


            // 提取模板中的变量名
            function getKey (code) {

                code = getVariable(code);

                // 分词
                forEach(code, function (name) {

                    // 除重
                    // TODO: name 可能在低版本的安卓浏览器中为空值，这里后续需要改进 getVariable 方法
                    // @see https://github.com/aui/artTemplate/issues/41#issuecomment-29985469
                    if (name && !uniq.hasOwnProperty(name)) {
                        setValue(name);
                        uniq[name] = true;
                    }

                });

            }


            // 声明模板变量
            // 赋值优先级:
            // 内置特权方法(include, print) > 私有模板辅助方法 > 数据 > 公用模板辅助方法
            function setValue (name) {

                var value;

                if (name === 'print') {

                    value = print;

                } else if (name === 'include') {

                    prototype["$include"] = _helpers['$include'];
                    value = include;

                } else {

                    value = "$data." + name;

                    if (_helpers.hasOwnProperty(name)) {

                        prototype[name] = _helpers[name];

                        if (name.indexOf('$') === 0) {
                            value = "$helpers." + name;
                        } else {
                            value = value
                                + "===undefined?$helpers." + name + ":" + value;
                        }
                    }


                }

                variables += name + "=" + value + ",";
            }


            // 字符串转义
            function stringify (code) {
                return "'" + code
                    // 单引号与反斜杠转义
                    .replace(/('|\\)/g, '\\$1')
                    // 换行符转义(windows + linux)
                    .replace(/\r/g, '\\r')
                    .replace(/\n/g, '\\n') + "'";
            }


        };
    })();


// RequireJS && SeaJS
    if (typeof define === 'function') {
        define(function() {
            return template;
        });

// NodeJS
    } else if (typeof exports !== 'undefined') {
        module.exports = template;
    }

    global.template = template;


})(this);


//JData
(function(global){
    //对象深拷贝
    Object.prototype.Clone = function(){
        var objClone;
        if (this.constructor == Object){
            objClone = new this.constructor();
        }else{
            objClone = new this.constructor(this.valueOf());
        }
        for(var key in this){
            if ( objClone[key] != this[key] ){
                if ( typeof(this[key]) == 'object' ){
                    objClone[key] = this[key].Clone();
                }else{
                    objClone[key] = this[key];
                }
            }
        }
        objClone.toString = this.toString;
        objClone.valueOf = this.valueOf;
        return objClone;
    }
      var JData=function(Tag){
               if (Tag==null) {
                   return JData['run'].apply(JData,['jd']);
               }  else if (typeof document.getElementsByTagName(Tag)[0]!='undefined'){
                   return JData['run'].apply(JData,[Tag]);
               }  else return JData['onerror'].apply(JData,["Don't have <"+Tag+"> "+"Tag. Please put JS after </body>"]);

      }
          //pageTransform 的过渡函数
          JData.TF=function(){};

          JData.run=function(Tag){
             renderData(0,Tag);
             //所有带ad属性a标签页面跳转,过渡设置和预加载
             pageTransform(global.JData.TF);
             // 删除页面数据
             // TODO:name 需要改进浏览器兼容问题, remove方法在<IE 8 的问题
             document.getElementsByTagName(Tag)[0].innerHTML='';
            // document.getElementsByTagName(Tag)[0].remove();            //IE不支持
          }

          JData.onerror=function(e){
              console.error(e);
          }

          //全局渲染
          JData.refreshAll=function(method,data,fun){
              if (data==null) data=undefined;
              renderData(0,data,method,fun);
          }
          //局部渲染
          JData.refreshPart=function(ID,method,data,fun){
              if (data==null) data=undefined;
              renderData(1,data,method,fun,ID);
          }

          //数据深拷贝获取
          JData.getData=function(){
              return this.data.Clone();
          }

          //通过ajax获取数据
          JData.getAjaxData=function(options,beforeFun,afterFun){
              if (typeof options.async=='undefined') {
                  options.async=false;
              }

              if (typeof options.type=='undefined'){
                  options.type='json';
              }
              if (options.type=='jsonp'){
                  getAjaxDataByjsonp(options,beforeFun,afterFun);
              }  else if (options.type=='script'){
                  getAjaxDataByscript(options,beforeFun,afterFun);
              }  else
              getAjaxData(options,beforeFun,afterFun);
          }

          //Tag初次加载为标签名,刷新时为空或数据对象
          function renderData(part,Tag,method,fun,scriptID){
              //数据获取
              if (typeof Tag==='string'){
              //页面加载时数据获取
              var data=document.getElementsByTagName(Tag)[0].innerHTML;
              data=eval('('+data+')');
              JData.data=data;
              } else if (typeof Tag==='object'){
              //带入参数,修改JData.data的数据刷新
                  var data=Tag;
                  if (part==0)
                  global.JData.data=data;
              } else if (typeof Tag=='undefined'){
              //外部修改JData.data时的数据刷新
                  var data=global.JData.data;
              }
              //数据渲染
              render(Tag,data,method,part,scriptID);
              //回调函数
              if (typeof fun!='undefined'){
                   fun();
              }
          }

          //part==0全局渲染 part==1 局部渲染
          function render(Tag,data,method,part,scriptID){
              var scriptTag=document.getElementsByTagName('script');
              for (var i=scriptTag.length-1; i>=0; i--)
              if (part==0||(part==1 && scriptTag[i].id==scriptID)){
                  var nNode=scriptTag[i];
                  var pNode=nNode.parentNode;
                  //判断模板
                  //TODO:name 需要增加模板错误验证机制,需要改进getAttribute 在 <IE8 情况下的问题
                  if (nNode.getAttribute('type')=='text/html'||nNode.getAttribute('typeName')=='text/html'||nNode.getAttribute('TYPE')=='text/html'){
                      var id=nNode.id;
                      var html=global.template.render(id,data);
                      if (typeof Tag=='string') {
                          pNode.innerHTML+=html;
                      } else {
                          if (method==0 || method=='replace'){
                              pNode.innerHTML=html;
                              //TODO:name 修改兼容性问题 <IE 8
                              pNode.appendChild(nNode);
                          }  else if (method==-1 || method=='before'){
                              pNode.innerHTML=html+pNode.innerHTML;
                          }  else pNode.innerHTML+=html;
                      }
                  }
                  if (part==1) break;
              }
          }

          function pageTransform(TF){
               var aTag=document.getElementsByTagName('a');
               for (var i=0; i< aTag.length; i++){
                   if (aTag[i].getAttribute('ad')!=null||aTag[i].getAttribute('adName')!=null||aTag[i].getAttribute('AD')!=null){
                       if (aTag[i].attachEvent){
                           aTag[i].attachEvent("onclick", function(){
                              TF();
                              iframeDataGet(this);
                           });
                       } else {
                           aTag[i].addEventListener('click',function(){
                               TF();
                              iframeDataGet(this)
                           });
                       }
                   }
               }

              function iframeDataGet(F){
                  var newIframe=document.createElement('iframe');
                  var src='#';
                  if (F.getAttribute('ad')!=null) src=F.getAttribute('ad');
                  if (F.getAttribute('adName')!=null) src=F.getAttribute('adName');
                  if (F.getAttribute('AD')!=null) src=F.getAttribute('AD');
                  newIframe.src=src;
                  newIframe.style.display='none';
                  if (newIframe.attachEvent){
                      newIframe.attachEvent("onload", function(){
                          iframeLoad(this);
                      });
                  } else {
                      newIframe.addEventListener('load',function(){
                          iframeLoad(this);
                      });
                  }
                  document.body.appendChild(newIframe);
              }

              //内容加载和跳转
              //TODO:name 增加点对点加载机制
              function iframeLoad(F){
                  window.location= F.src;
              }
          }

          //jsonp的形式请求调用,afterFun 为回调函数名(一个字符串)
          function getAjaxDataByjsonp(options,beforeFun,afterFun){
              beforeFun();
              var url = options.url+'?'+options.parse+'&callback='+afterFun;
              var script = document.createElement('script');
              script.setAttribute('src', url);
              document.getElementsByTagName('head')[0].appendChild(script);
          }

          //直接加载js文件的形式改变当前作用域的数据情况
          function getAjaxDataByscript(options,beforeFun,afterFun){
              beforeFun();
              var url = options.url+'?'+options.parse;
              var script = document.createElement('script');
              script.setAttribute('src', url);
              if (script.attachEvent){
                  script.attachEvent("onload", function(){
                      afterFun();
                  });
              } else {
                  script.addEventListener('load',function(){
                      afterFun();
                  });
              }
              document.getElementsByTagName('head')[0].appendChild(script);
          }

          function getAjaxData(options,beforeFun,afterFun){
              beforeFun();
              if (window.XMLHttpRequest)
              {// code for IE7+, Firefox, Chrome, Opera, Safari
                  xmlhttp=new XMLHttpRequest();
              }
              else
              {// code for IE6, IE5
                  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
              }
              xmlhttp.onreadystatechange=function()
              {
                  if (xmlhttp.readyState==4 && xmlhttp.status==200)
                  {
                      try{
                      if (options.type=='json'){
                          var content=eval("("+xmlhttp.responseText+")");
                      } else if (options.type=='text') {
                          var content=xmlhttp.responseText;
                      } else content='请求格式错误';
                      afterFun(false,content);
                      } catch(e){
                          afterFun('服务端数据JSON格式错误!',null);
                      }

                  }  else if (xmlhttp.status==404){
                      afterFun('请求页面不存在!',null);
                  }
              }
              if (options.method=='POST'){
              xmlhttp.open(options.method,options.url,options.async);
              xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
              xmlhttp.send(options.parse);
              } else if (options.method=='GET'){
                  xmlhttp.open(options.method,options.url+'?'+options.parse,options.async);
                  xmlhttp.send();
              }  else afterFun('请求方式错误!',null)
          }


    global.JData=JData;
})(this);

//TODO:name 代码优化,文件大小缩减