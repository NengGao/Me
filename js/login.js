

/****************************************** Login start ***********************************************/
var auths={};
function loginReady(){
	// 获取登录认证通道
	plus.oauth.getServices(function(services){
		//此处是取检测我们配置的所有 第三方登录认证  目前我们只支持微信登录  
		for(var i in services){
			var service = services[i];
			auths[service.id]=service;
		}
	},function(e){
		alert("获取登录认证失败："+e.message);
	});
}
// 登录认证
function login(id){
	//登录认证
	
	var auth=auths[id];
	if(auth){
		auth.login(function(){
			alert(id);
			// JSON.stringify(auth.authResult)
			userinfo(auth);
		},function(e){
			alert("登录认证失败: code:"+ e.code + e.message);
		});
	}else{
		alert("无效的登录认证通道！");
	}
}
// 获取用户信息
function userinfo(a){
	a.getUserInfo(function(){
		var _userInfo = JSON.stringify(a.userInfo);
		var nickname=a.userInfo.nickname || a.userInfo.name;
		alert("欢迎“"+nickname+"”登录！");
	},function(e){
		alert("获取用户信息失败：");
	});
}
// 注销登录
function logoutAll(){
	for(var i in auths){
		logout(auths[i]);
	}
}
function logout(auth){
	auth.logout(function(){
		alert("注销成功");
	},function(e){
		alert("注销失败！");
	});
}
/****************************************** Login end ***********************************************/