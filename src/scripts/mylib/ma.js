
//按照规范要求，模块需要使用define函数定义
//定义模块时，依然可以声明依赖
define(["jquery"], function(){
	console.log("我定义的模块");
	$.myfun = function(){
		console.log("myfun");
	}
});
