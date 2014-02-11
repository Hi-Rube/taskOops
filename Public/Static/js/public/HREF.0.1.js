/**
 * Created with JetBrains WebStorm.
 * User: rube
 * Date: 1/29/14
 * Time: 3:15 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 * 不同的工具栏样式
 * E:工具名称 T:iframe执行的命令 M:格外的信息 N:工具数
 */
var $HREFType=function(method){
    var Chinese={'加粗':{'E':'加粗','T':'bold'},'倾斜':{'E':'倾斜','T':'italic'},'下划':{'E':'下划','T':'underline'},
                 '居中':{'E':'居中','T':'justifycenter'},'居左':{'E':'居左','T':'justifyleft'},'居右':{'E':'居右','T':'justifyright'},
                 '悬挂':{'E':'悬挂','T':'outdent'},'缩进':{'E':'缩进','T':'indent'},'无序':{'E':'无序','T':'insertunorderedlist'},
                 '有序':{'E':'有序','T':'insertorderedlist'},'源码':{'E':'源码','T':'html'},'插入图片':{'E':'插入图片','T':'insertimage'},
                 '超链接':{'E':'超链接','T':'createlink'},
                'M':{'E':'信息','N':'13'}};
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
    var Button=Chinese.Clone();
    for (var p in Chinese)
    {
        Button[p].E="<span style='border: 6px solid #f5f6f7; border-radius: 10px 10px 10px 10px; cursor: pointer; background:#f5f6f7'>"+p+"</span>";
    }
    try
    {
    return eval(method);
    }
    catch(e){
        alert("没有对应的method");
    }
    return {
        Chinese:function(){ return Chinese; }
    }
};


var $HREF=function(){
    var pam0=arguments[0],pam1=arguments[1],pam2=arguments[2],pam3=arguments[3];
    if (pam0!=null)                                                                      //中文方法的支持
    {
        switch (pam0){
            case "监听":{ $HREF().addEvent(pam1,pam2,pam3); break;};
            case "获取属性":{ $HREF().getCss(pam1,pam2); break;};
            case "创建编辑器":{ $HREF().creatEdit(pam1,pam2,pam3); break;};
        }
    }
    else
    return {
        addEvent:(                                                                       //支持兼容的监听
            function () {
            if (document.addEventListener) {
                return function (el, type, fn) {
                    el.addEventListener(type, fn, false);
                };
            } else {
                return function (el, type, fn) {
                    el.attachEvent('on' + type, function () {
                        return fn.call(el, window.event);
                    });
                }
            }
        })(),
        getCss:(function(){                                                              //获取样式
            return function( o , key )
            {
                return o.currentStyle? o.currentStyle[key] : document.defaultView.getComputedStyle(o,null)[key];
            };
        })(),
        creatEdit:(function(){                                                           //创建编辑器
            return function(target,method,options){
                (
                function(){                                                             //初始化工具条
                        var eBar=document.createElement("div");
                        eBar.setAttribute("ID","bar");
                        var type=$HREFType(method);
                        var i;
                        for (i=0; i<options.length; i++)
                        if (!(typeof(type[options[i]])=="undefined"))
                        {
                            var eButton=document.createElement("span");
                            eButton.setAttribute("class","button");
                            eButton.setAttribute("title",type[options[i]].T);
                            eButton.innerHTML=type[options[i]].E;
                            eBar.appendChild(eButton);
                        }
                    var textarea=document.getElementById(target);
                    textarea.parentNode.insertBefore(eBar,textarea);
                })();
                var switchEditMode = true;
                var bar=document.getElementById("bar");
                var buttons=bar.getElementsByTagName("span");
             //   var selects =bar.getElementsByTagName("select");
                var textarea=document.getElementById(target);
                textarea.style.display = "none";
                var iframe = document.createElement("iframe");
                iframe.style.width=$HREF().getCss(textarea,"width");
                iframe.style.height=$HREF().getCss(textarea,"height");
                iframe.frameBorder=0;
                textarea.parentNode.insertBefore(iframe,textarea);
                var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
                iframeDocument.designMode = "on";
                iframeDocument.open();
                iframeDocument.write('<html><head><style type="text/css">body{ word-wrap:break-word;font-family:arial; font-size:16px;background:#f5f6f7; }</style></head></html>');
                iframeDocument.close();

                (function(){                                                 //监听工具按钮
                    for(var i = 0,l= buttons.length;i<l;i++){
                        buttons[i].onclick = new function(){
                            var command=buttons[i].getAttribute("title");
                            return function(){
                                switch(command){
                                    case 'createlink':
                                    case 'insertimage':
                                        var value = prompt('请输入超链接:', 'Http://');
                                        iframeDocument.execCommand(command,false,value);
                                        break;
                                    case "html":                           //查看源码
                                        if(switchEditMode){                //切换到textarea
                                            iframe.style.display = "none";
                                            textarea.style.display = "block";
                                            textarea.value = iframeDocument.body.innerHTML;
                                            textarea.focus();
                                            switchEditMode = false;
                                        }else{//切换到iframe
                                            iframe.style.display = "block";
                                            textarea.style.display = "none";
                                            iframeDocument.body.innerHTML = textarea.value;
                                            iframe.contentWindow.focus();
                                            switchEditMode = true;
                                        }
                                        break;
                                    default:
                                        iframeDocument.execCommand(command,false,'');
                                        iframe.contentWindow.focus();
                                }
                            };
                        };
                    };
                    $HREF().addEvent(iframe.contentWindow,'blur',function(){
                        textarea.innerHTML = iframeDocument.body.innerHTML;
                    });
                })();
            }
        })()
    }
};
