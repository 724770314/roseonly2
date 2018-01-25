var basePath ='';
var orderBasePath = '';
String.prototype.trim = function(){return this.replace(/(^\s*)|(\s*$)/g, "");};
var App = {
	//工具类
	util: {
		//验证字符串是否为空
		isEmpty:function(str){
			return (typeof str== 'undefined' || str==null || (typeof str=='string' && str.trim() ==''));
		},
		isNotEmpty:function(v){
			return !App.util.isEmpty(v);
		},
		//判断是否是数字
		isNumber:function(v) {
			return new RegExp(/^\d+$/).test(v);
		},
		//验证手机
		checkMobile :function(v){
			return /^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/.test(v);
		},
		//验证国际手机
		checkInternationalMobile :function(v){
			return /^([1-9])\d+$/.test(v);
		},
		//邮箱
		checkMail:function(v){
			return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(v);
		},
		//特殊字符
		checkStrValid: function(str) {
			var pattern = new RegExp("[%#$^&*|\\[\\]<>/]");

			return pattern.test(str);
		},
		//验证字符串是否为空
		isEmpty:function(str){
			return (typeof str== 'undefined' || str==null || (typeof str=='string' && str.trim() ==''));
		},
		// 取当月最后一天
		getCurMonthLastDay:function(){
			var Nowdate=new Date();
			var MonthNextFirstDay=new Date(Nowdate.getYear(),Nowdate.getMonth()+1,1);
			return new Date(MonthNextFirstDay-86400000).getDate();
		},
		//前补0
		addZero:function(str,length){
		    return new Array(length-(''+str).length+1).join("0") + str;
		},

		formatDate:function (date, format) {
			function addZero(str,length){
				return new Array(length-(''+str).length+1).join("0") + str;
			}
	        if (arguments.length < 2 && !date.getTime) {
	            format = date;
	            date = new Date();
	        }
	        typeof format != 'string' && (format = 'YYYY年MM月DD日 hh时mm分ss秒');
	        var week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', '日', '一', '二', '三', '四', '五', '六'];
	        return format.replace(/YYYY|YY|MM|DD|hh|mm|ss|星期|周|www|week/g, function(a) {
	            switch (a) {
	            case "YYYY": return date.getFullYear();
	            case "YY": return (date.getFullYear()+"").slice(2);
	            case "MM": return addZero(date.getMonth() + 1,2);
	            case "DD": return addZero(date.getDate(),2);
	            case "hh": return addZero(date.getHours(),2);
	            case "mm": return addZero(date.getMinutes(),2);
	            case "ss": return addZero(date.getSeconds(),2);
	            case "星期": return "星期" + week[date.getDay() + 7];
	            case "周": return "周" +  week[date.getDay() + 7];
	            case "week": return week[date.getDay()];
	            case "www": return week[date.getDay()].slice(0,3);
	            }
	        });
	    },
		//随机串
		nonceStr:function(){
			var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		    var maxPos = $chars.length;
		    var noceStr = "";
		    for (var i = 0; i < 32; i++) {
		        noceStr += $chars.charAt(Math.floor(Math.random() * maxPos));
		    }
		    return noceStr;
		},
		//取远程数据 json格式
		loadRemoteJson: function(url, data, callback) {
			$.getJSON(url, data, function(data) {
				if (typeof callback == 'function') {
					callback(data);
				}
			});
		},
		//渲染模板 ; 依赖doT.min.js
		render: function(tmpl, data, container) {
			var doTtmpl = doT.template(tmpl);
			var html = doTtmpl(data);
			if (typeof container == 'string') {
				$(container).html(html);
			}
			return html;
		},
		//追加下拉框选项
		appendOption : function (data,selector){
			var tmpl = '{{ for(var i=0;i<it.length;i++) { }}<option value="{{=it[i].id}}">{{=it[i].name}}</option>{{ } }}';
			var doTtmpl = doT.template(tmpl);
			$(selector).append(doTtmpl(data));
		},
		//设置下拉框选项
		setOption : function (data,selector,defaults){
			if(typeof defaults == 'undefined'){
				defaults='请选择';
			}
			var tmpl = '<option value="0">'+defaults+'</option>{{ for(var i=0;i<it.length;i++) { }}<option value="{{=it[i].id}}">{{=it[i].name}}</option>{{ } }}';
			var doTtmpl = doT.template(tmpl);
			$(selector).html(doTtmpl(data));
		},
		//取cookie
		getCookie:function(objName){//获取指定名称的cookie的值
		    var arrStr = document.cookie.split("; ");
		    for(var i = 0;i < arrStr.length;i ++){
				var temp = arrStr[i].split("=");
				if(temp[0] == objName) {
					return unescape(temp[1]);
				}					 
			}
			return undefined;
		},
		setcookie:function (name,value){
	        var Days = 7;
	        var exp  = new Date();
	        exp.setTime(exp.getTime() + Days*24*60*60*1000);
	        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+';domain='+cookieDomain+';path=/;';  	        
	    } ,
	    //删除cookie
	    delCookie:function(name){//为了删除指定名称的cookie，可以将其过期时间设定为一个过去的时间
		   var date = new Date();
		   date.setTime(date.getTime() - 10000);
		   document.cookie = name + "=0; domain="+cookieDomain+"; path=/;expires=" + date.toGMTString();
		},
		//url 参数
		getUrlParams: function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if (r != null)
				return r[2];
			return null;
		},//设置国家下拉框
		setCountries : function(selector){
			var data = [{"id":"61","name":"澳大利亚"},{"id":"82","name":"韩国"},{"id":"1","name":"加拿大"},{"id":"60","name":"马来西亚"},{"id":"1",	"name":"美国"},	{"id":"81",	"name":"日本"},{"id":"65","name":"新加坡"},{"id":"44","name":"英国"},{"id":"86","name":"中国"},{"id":"853","name":"中国澳门"},{"id":"886","name":"中国台湾"},{"id":"852","name":"中国香港"}];
			var tmpl = '{{ for(var i=0;i<it.length;i++) { }}<option value="{{=it[i].id}}" {{?it[i].id==86}}selected=selected{{?}}>{{=it[i].name}}</option>{{ } }}';
			var doTtmpl = doT.template(tmpl);
			$(selector).html(doTtmpl(data));
		},		
		loadAssetsFile : function (filename, filetype){ 
			var fileref = "";
			if (filetype=="js"){ //判断文件类型 
			  fileref=document.createElement('script');//创建标签 
			  fileref.setAttribute("type","text/javascript");//定义属性type的值为text/javascript 
			  fileref.setAttribute("src", filename);//文件的地址 
			}else if (filetype=="css"){ //判断文件类型 
			  fileref=document.createElement("link");
			  fileref.setAttribute("rel", "stylesheet");
			  fileref.setAttribute("type", "text/css"); 
			  fileref.setAttribute("href", filename);
			} 
			if (fileref) {
				document.getElementsByTagName("body")[0].appendChild(fileref); 
			}
		},
		ajax : function(options){	
			if(typeof jQuery === "function" && $ === jQuery || typeof Zepto === "function" && $ === Zepto){
				$.ajax({
					type: options.type || 'get',
					url: options.url,
					dataType: options.dataType || 'json',
					data: options.data || {},
					success: function(res){
						if(typeof options.success === "function"){
							options.success(res);
						}
					},error:function(XMLHttpRequest, textStatus, errorThrown){
						console.log("%c error : " + textStatus,"color:#f00");
					}					
				});
			}
		}
	},	
	//数据来源地址
	data: {
		loginUrl : orderBasePath+'/pcLogin/login?callback=?', //登录
		useronly_check:basePath+'/pages/Register/checkUsername.htm',
		randcode_check:basePath+'/pages/Register/checkRand.htm'
	},
	checkStrValid: function(str) {
		var pattern =  new RegExp("[%#$^&*|\\[\\]<>/]");

		return pattern.test(str);
	},
	jsonToString: function(O) {
		var string = [];
		var isArray = function(a) {
			var string = [];
			for (var i = 0; i < a.length; i++) {
				string.push(App.jsonToString(a[i]));
			}
			return string.join(",");
		};
		var isObject = function(obj) {
			var string = [];
			for (var p in obj) {
				if (obj.hasOwnProperty(p) && p != "prototype") {
					string.push("\"" + p + "\":" + App.jsonToString(obj[p]));
				}
			}
			return string.join(",");
		};

		if (O instanceof Function) {
			string.push(O);
		} else {
			if (O instanceof Array) {
				string.push("[" + isArray(O) + "]");
			} else {
				if (typeof O == "object") {
					if (O == null)
						string.push('null');
					else if (O == '')
						string.push('');
					else if (!O)
						string.push('false');
					else
						string.push("{" + isObject(O) + "}");
				} else if (typeof O == "string") {
						string.push("\"" + O + "\"");
				} else 	if (typeof O == "number" && isFinite(O)) {
						string.push(O);
				} else if (typeof O == 'boolean') {
					if (!O)
						string.push('false');
					else
						string.push('true');
				}else if(typeof O == 'undefined'){
					string.push("\"\"");
				}
			}
		}
		return string.join(",");
	},
	getWidth: function(a) {
		var b;
		return 310 > a ? b = 310 : a >= 310 && 360 > a ? b = 360 : a >= 360 && 480 > a ? b = 480 : a >= 480 && 570 > a ? b = 570 : a >= 570 && 640 > a ? b = 640 : a >= 640 && 720 > a ? b = 720 : a >= 720 && a <= 960 ? b = 960 : (b = 960), b;
	},	
	//验证是否登录
	isLogin:function(){
		var s=App.util.getCookie('index_cookiename');
		return !(typeof s == 'undefined' || (typeof s=='string' && s.length==0));
	},
	//表单验证
	formValidate:function(ele,type){
		var v=$(ele).val(),b=false;
		if('mobile'==type){
			b=App.util.checkMobile(v);
		}else if('mail'==type){
			b=App.util.checkMail(v);
		}else if(typeof type == 'undefined' || null ==type){
			b=(!App.util.isEmpty(v) && !App.checkStrValid(v));
		}else if('address'==type){
			b = !(v==0);
		}
		if(!b){
			$(ele).siblings('div.checkRes').show();
		}else{
			$(ele).siblings('div.checkRes').hide();
		}
		return b;		
	},
	//弹出层
	showPop:function(selector,callback){

		App.curPop=$(selector);

		$('.ceng').hide();
		$('#mark').hide();
		var $ele=$(selector);
		$ele.show(200);
		var t=($(window).height()-$ele.height())/2;

		$ele.css('top',t);
		
		$('#mark').height($(document).height()).fadeIn();

		if(typeof callback=='function'){
			callback();
		}

		
	},
	hidePop:function(selector){
		$(selector).hide();
		$('#mark').hide();
	},
	// 显示登录框
	showLogin:function(callback){
		if (!App.loginPop) {
			App.loginPop=$('<div class="bounced_bg" id="mark"></div><div class="bounced_login" id="logindiv_info" style="display:none"><a title="关闭" href="javascript:App.hideLogin();" class="bounced_close"></a><img src="http://www.roseonly.com.cn/index/images/bounced01.png" class="bounced_tit" alt="登录" title="登录" /><form action="http://www.roseonly.com.cn/pages/Login/login.htm" name="loginForm" id="loginForm" method="post"><input type="text" class="bounced_text" placeholder="请输入注册时的邮箱/手机号" name="loginname" id="un1"  titles="请输入您注册时的个人邮箱！"  maxlength="40" /><div id="msgdiv" class="bounced_red">&nbsp;</div><input type="password" class="bounced_password" name="password" id="pwd1" placeholder = "请输入密码" titles="请输入密码" maxlength="12" /><div class="bounced_red"></div><br/><a href="http://www.roseonly.com.cn/findpass.html" class="bounced_forget">忘记密码？</a></form><div class="bounced-button"><a href="http://www.roseonly.com.cn/pages/Login/myRegister.htm" class="bounced-left">注册</a><a href="javascript:;" class="bounced-right" id="loginBtn">登录</a></div><div class="clear"></div><div class="bounced_other"><span>其他方式登录：</span><a href="http://www.roseonly.com.cn/pages/YLogin/sinaLogin.htm?opt=1"><img border="0" src="http://www.roseonly.com.cn/index/images/bounced06.png" alt="新浪微博登录" title="新浪微博登录" /></a><a href="http://www.roseonly.com.cn/pages/YLogin/qqUserLogin.htm"><img border="0" src="http://www.roseonly.com.cn/index/images/bounced07.png" alt="QQ登录" title="QQ登录" /></a><a href="javascript:void(0);" onclick="opennewpage();"><img border="0" src="http://www.roseonly.com.cn/index/images/bounced08.png" alt="微信登录" title="微信登录" /></a></div></div>');
			$('body').append(App.loginPop);
			loginEventBind();
		}
		$('.ceng').hide();
		$('#mark').hide();
		var $ele=$('#logindiv_info');
		$ele.show(200);
		var t=($(window).height()-$ele.height())/2;

		$ele.css('top',t);
		
		$('#mark').height($(document).height()).fadeIn();

		if(typeof callback=='function'){
			callback();
		}
		
	},
	//隐藏登录框
	hideLogin:function(){
		App.hidePop('#logindiv_info');
	}
};

//加载导航菜单
App.menu = function(){
	var templateHtml = '<div class="nav-bar"> <ul id="nav" class="cl-effect-1"> {{~it.childTags :menu:index}} <li><a href="{{=basePath}}{{=menu.urlStr}}" class="topmenu_1">{{=menu.name}}</a> {{?menu.childTags.length>0}} <div class="menus2"> <div class="menus"> {{~menu.hasChildTags :chil:cIndex}} <div class="number1"><span class="number1_tab">{{=chil.name}}</span> {{~chil.groupATag :cha:chIndex}} <a href="{{=basePath}}{{=cha.urlStr}}"> <span>{{=cha.name}}{{=getmenulabel(cha.id)}}</span> </a> {{~}} </div> {{~}} <a class="menus_pic" href="{{=menu.pcpichref ||\'javascript:;\'}}"><img src="{{=basePath}}/{{=menu.pcpicpath}}" alt=""></a> </div> </div> {{?}} </li> {{~}} </ul> </div>';
	if ($('#topmenus').attr('id')) {
		App.util.render(templateHtml,roseonly_menu_data,"#topmenus");
		goPage();  
		//判断是roseonly（1）菜单 不是love（2）菜单
		if(typeof roseonly_menu_data == "object" && roseonly_menu_data.id == 1){
			$('.cl-effect-1').find('li:eq(0)>a').addClass('qxlm'); 
		}		       
	}
	
	function goPage(){
		if(IsPC()){
			var n_timer = 0;
			$("#nav li").hover(
					function () {
                        var _this = $(this);
                        $(this).children(".topmenu_1").addClass("nav_cur").css({'color': '#414141'});
                        n_timer = setTimeout(function () {
                            _this.children(".menus2").fadeIn(500);
                        }, 300);
                    },
                    function () {
                        $(this).children(".menus2").fadeOut(400);
                        $(this).children(".topmenu_1").removeClass("nav_cur").css({
                            'color': '#FFFFFF'
                        });
                        clearTimeout(n_timer);
                    }
            );
        }else{
            $("#nav li").hover(
        		function() {
        			$(this).children(".menus2").show();
        		},
                function() {
                	$(this).children(".menus2").hide();
                }
            );
        }
    }
	
	function IsPC(){
		var userAgentInfo = navigator.userAgent;
		var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
		var flag = true;
		for (var v = 0; v < Agents.length; v++) {
			if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
		}
		return flag;
	}
	
	//----------------
	if(typeof roseonly_menu_data == "object" && roseonly_menu_data.id == 1 && navigator.userAgent.toLowerCase().match(/iPad/i) != "ipad" && $('#topmenus').length>0){
    	$(window).scroll(function(){
            if($(window).scrollTop()>115){
                $('.nav-container').addClass('nav_cur');
                $('.nav-container > div').find('ul li').css({margin:'0 11px'});
                if($('.right > span').length == 1){
                	$('.right').addClass('right_cur').css({'left':$('#nav').offset().left+1000+'px'});
                }else{
                	$('.right').addClass('right_cur').css({'left':$('#nav').offset().left+1020+'px'});
                }
                $('.logo_f_cur').css({'display':'block','left':($('#nav').offset().left-130)+'px'});
                $('.right-shop').css({'background-image':'url(http://www.roseonly.com.cn/upload/syspic_new/14714190847943344.svg)'});
            }else if($(window).scrollTop()<115){
                $('.nav-container').removeClass('nav_cur');
                $('.nav-container > div').find('ul li').css({margin:'0 32px'});
                $('.nav-container > div').find('ul').find('li').eq(0).css({'margin-left':'0'});
                $('.right').removeClass('right_cur').removeAttr('style','left');
                $('.logo_f_cur').css({'display':'none'});
                $('.right-shop').css({'background-image':'url(http://www.roseonly.com.cn/assets/roseonly/images/icon.svg)'});
            }
        });
	}
}();
//获取导航菜单角标（New,Hot）
function getmenulabel(id){
	var _hot = [36,39,42,59,63,70,78,82,88,96,101,379,377];
	var _new = [381,32,51,94,371,77,420,434];
	if(_new.indexOf(id)>-1){
		return '<label></label>';
	}else if(_hot.indexOf(id)>-1){
		return '<label class="hot"></label>';		
	}else{
		return '';
	}
}

$(function(){
	//详情数量
	$('.right_up').click(function(){
		var num = parseInt($('.right_number').val())||1;
		$('.right_number').val(++num);
	});
	
	$('.right_down').click(function(){
		var num = parseInt($('.right_number').val())||1;
		$('.right_number').val(--num<1?1:num);
	});
	
	$('.right_number').blur(function(){
		var num = $(this).val();
		num = parseInt(num) || 0;
		
		if (num<1) {
			$(this).val(1);
		}
	});
});
/** 立即购买 */
var tobuy = function(){
	var num = $.trim($('.right_number').val());
	var pid = getProductId();
	if (App.util.isNotEmpty(pid)) {
		if(App.isLogin()){
			location.href=orderBasePath+'/cart/buyNow/'+pid+'?type=1&num='+num;
		}else{
			location.href=orderBasePath+"/pcEntrance/tologin?url="+location.href;
		}
	}
};
/** 加入购物车 */
var tocart = function(){
	var num = $.trim($('.right_number').val());
	var pid = getProductId();
	if (App.util.isNotEmpty(pid)) {
		location.href=orderBasePath+'/cart/buy/'+pid+'?num='+num;
	}
};
//手机验证框事件绑定
var validateEventBind = function(callback){
	//隐藏验证一层
 	$('.close_cancel_order').on('click',function(){
		$('#shade_layer').hide();
		if(typeof callback=='function'){
			callback();
		}
	});
	//去绑定手机
	$('#bindmobile').on('click',function(){
		$('#shade_layer').hide();
		if(!App.bindmobileceng){
			App.bindmobileceng = $('<div class="shade_layer" id="shade_layer1"><div class="shade_shadow"></div><div class="shade_content"><div class="shade_font"><p class="f24 ppp">请您绑定手机</p>－ <p class="ppp">输入手机号码</p><input type="text" id="mobile" class="shade_phonenum" /><p>输入手机验证码</p><div class="shade_div"><input type="text" class="shade_yzhnum" id="smscode" /><a href="javascript:;" id="getsms" class="shade_getnum">获取验证码</a><div class="clear"></div></div><a href="javascript:;" id="validatemobile" class="shade_a3">绑定手机</a><div class="clear"></div></div><a title="关闭" href="javascript:;" class="button_close" id="close_cancel_order"></a></div></div>');
			$('body').append(App.bindmobileceng);
			validateEventBind(callback);
		}
		$('#shade_layer1').show();
		$.getJSON(orderBasePath+'/pcLogin/getmobile?callback=?',function(data){
			if(data.mobile!=null){
				$('#mobile').val(data.mobile);
				$('#mobile').attr("readonly",true);
			}
		});
	});
	//隐藏验证二层
	$('#close_cancel_order').on('click', function(){
		$('#shade_layer1').hide();
		if(typeof callback=='function'){
			callback();
		}
	});
	
	//点击获取验证码
	$('#getsms').bind('click', function () {
   		var mobile = $("#mobile").val();
	 	var ele = $(this);
	 	if(App.util.checkMobile(mobile)){
	 		if(!ele.hasClass('disabled')){
		 		var time_after = 60,timer = 0;
				timer = setInterval(function(){
					if(time_after==0){
						ele.text('重新获取').removeClass('disabled');
						clearInterval(timer);
						return;
					}
					ele.text('重新获取('+time_after+')').addClass('disabled');
					time_after--;
				},1000);
				$.getJSON(orderBasePath+'/pcLogin/sendsmscode?callback=?&mobile='+mobile,function(data){
					alert(data.notice);
				});
			}
	 	}else{
	 		$("#mobile").focus();
	 		alert("请输入正确的手机号码");
	 	}
   	});    	
	//点击验证
	$('#validatemobile').bind('click', function () {
		var smscode = $("#smscode").val();
	    var mobile = $("#mobile").val();
	    $.getJSON(orderBasePath+'/pcLogin/checksmscode?callback=?&mobile='+mobile+'&smscode='+smscode,function(data){
			if(data.status=='1'){//验证成功
				alert("验证成功");
				$("#shade_layer1").hide();
				if(typeof callback=='function'){
					callback();
				}
			}else if(data.status=='2'){//验证失败，验证码错误
				alert("验证码不正确");
				$("#smscode").focus();
			}else if(data.status=='0'){//登录失效
	    		window.location.href = '/Login/myRegister.htm';
	    	}
		});
	});
};
//登录框事件绑定
var loginEventBind = function() {
	var username,a=false,b=false;
	var defaultUsername = '请输入注册时的邮箱/手机号',defaultPassword='请输入密码';
	$('input[name=loginname]').on('blur',function(){
		var ele=$(this),v=ele.val();
		username=v;
		
		if (App.util.isEmpty(username)) {
			ele.val(defaultUsername);
		}
		
		if(!App.util.checkMail(v) && !App.util.checkMobile(v) || v==defaultUsername){
			ele.next('div.bounced_red').text('*请您输入邮箱/手机号格式的用户名！');
			a=false;
			return;
		}
		a=true;
		ele.next('div.bounced_red').text('');
	}).on('focus',function(){
		var ele=$(this),v=ele.val();
		if(v == defaultUsername) {
			ele.val('');
		}
	});
	
	$('input[name=password]').on('blur',function(){
		var ele=$(this),v=ele.val();
		if(v.length==0){
			ele.next('div.bounced_red').text('*请您输入密码！');
			$('#pwd_span').text(defaultPassword);
			b=false;
			return;
		}
		b=true;
		ele.next('div.bounced_red').text('');
	}).on('focus',function(){
		var v = $('#pwd_span').text();
		if(v==defaultPassword) {
			$('#pwd_span').text('');
		}
	});
	// 登录
	$('#loginBtn').on('click',function(){
		var username = $('input[name=loginname]').val();	
		var password = $('input[name=password]').val();	
		if(App.util.isEmpty(username)||username==defaultUsername){
			$('input[name=loginname]').next('div.bounced_red').text('*请您输入邮箱/手机号格式的用户名！');
			return false;
		}	
		if(App.util.isEmpty(password)){
			$('input[name=password]').next('div.bounced_red').text('*请您输入密码！');
			return false;
		}	
		var logintag=0;	
		if(App.util.checkMail(username)){
			logintag=1;
		}	
		if(App.util.checkMobile(username)){
			logintag=2;
		}
		$('input[name=loginname]').blur();
		$('input[name=password]').blur();
	
		if(a && b){
			$.getJSON(App.data.loginUrl+'&logintag='+logintag+'&username='+username+'&password='+password,function(data){
				if(data.status==1){
					App.util.delCookie('index_cookiename_all');
					App.hideLogin();
					$('.unlogin').hide();
					$('.login').show();
					$('input[name=password]').val('');
				}else{
					$('input[name=password]').next('div.bounced_red').text(data.notice);
				}	
			});
		}
	});	
	document.onkeydown = function(e){ 
		var evt = window.event?window.event:e; 
		if(evt.keyCode==13){ 
			$('#loginBtn').click();
		}
	};
};

// 退出登录
var logout = function(){
	// 这些操作应该服务器端处理，服务器端需要清除登录相关信息
	App.util.delCookie('index_cookiename');
	App.util.delCookie('index_cookiename_username');
	App.util.delCookie('index_cookieother');
	App.util.delCookie('code');
	App.util.delCookie('token');
	App.util.delCookie('timestamp');
	$.getJSON(orderBasePath+'/pcEntrance/logout',function(data){
		if(data && data.status==1){	
			console.log(data);
		}
	});
	window.location.href = orderBasePath+'/pcEntrance/tologin?url='+window.location.href;	
};

// 刷新购物车
var refreshCart = function() {
	var carValue = App.util.getCookie('my_card_productid_count');	
	if(App.util.isNotEmpty(carValue)) {
		var pattern =  new RegExp("[0-9]+_[1-9]+_[1-9]+#",'g');
		var r = carValue.match(pattern);

		if (r!=null&&r.length>0){
			$('#cartNum').text("("+r.length+")");
		}else{
			$('#cartNum').text('(0)');
		}
	}
};

var getProductId = function() {
	var key = '';
	$('.p-choose .selected').each(function(i,e){
		if (i==0) {
			key = $(e).attr('data-attrid');
		} else {
			key = key + '_' + $(e).attr('data-attrid');
		}
	});
	return colorSize[key];
};

var product_jump = function(path,pid){
	var jpid = getProductId();
	if(jpid==pid) {
		return;
	}
	if (App.util.isNotEmpty(jpid)) {
		var _fromtype = $.trim($("#txt_fromtype").val());
		if(_fromtype == "0"){
			location.href=path+'/item/'+jpid+'.html';			
		}else if(_fromtype == "1"){
			location.href=path+'/loveroseonly/item/'+jpid+'.html';	
		}else if(_fromtype == "3"){
			location.href=path+'/foralllove/item/'+jpid+'.html';
		}
	}
};

//页面加载时需要执行的方法
App.onLoad = function(){
	// 判断登录
	if(App.isLogin()) {
		$('.unlogin').hide();
		$('.login').show();
	}	
	//更新购物车数量
	refreshCart();
}();

function showPic(obj){		
	var m=$(obj).attr("path");
	$("#pi").attr("src",m);	
	var g=$(document).scrollTop();		 
	var w=$("#preview").width();
	var h=$("#preview").height();
	var l=($(window).width()-w)/2;
	var t=($(window).height()-h)/2+g;		
	$("#preview").css("top",t).css("left",l).fadeIn("fast");
}
function closeShow(obj){
	$("#preview").hide();
}
function opennewpage(){
	window.open("http://orders.roseonly.com.cn/weixinWebLogin");
}

//添加到货通知
function addArrivalNotice(proid){
	var mobile = $("#noticeMobile").val();
	var email = $("#noticeEmail").val();
	if(App.util.isEmpty(mobile) && App.util.isEmpty(email) ){
		alert("手机 和 邮箱不能都为空！");
		return false;
	}
	if(App.util.isNotEmpty(mobile) && !App.util.checkMobile(mobile)){
		alert("手机格式不正确！");
		return false;
	}
	if(App.util.isNotEmpty(email) && !App.util.checkMail(email)){
		alert("邮箱格式不正确！");
		return false;
	}
	var url = basePath + "/pages/ProProductArrivalNotice/save.htm";
	$.ajax({
		url:url,
		type:"post",
		data:{mobile:mobile,email:email,proid:proid},
		success:function(data){
			if(data.status==1){
				alert("您已成功添加到货通知，到货时，我们会以短信、邮件的方式及时通知到您！");
			}else{
				alert("添加到货通知添加失败！");
			}
		}
	});
}