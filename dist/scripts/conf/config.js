//做配置（配置每一个模块的加载路径）
requirejs({
	baseUrl: "http://localhost:8000/",
	paths : {
		"jquery" : "static/scripts/jquery-2.0.3",
		"swiper" : "static/scripts/swiper",
		"jq.ui" : "static/scripts/jquery-ui",
		"myfun" : "scripts/mylib/ma",
		"common" : "scripts/common/common",
		"zoom" : "scripts/lib/jquery.jqzoom-core",
		"css" : "scripts/lib/css",
		"productlist" : "scripts/commen/productlist",
		"public" : "scripts/commen/public",
		"shouban" : "scripts/commen/shouban",
		"buycar" : "scripts/commen/buycar"
	},
	shim : {
		"zoom" : {
			deps : ["jquery"]
		},
		"swiper" : {
			deps : ["css!static/styles/swiper.css"]
		}
	}
})
