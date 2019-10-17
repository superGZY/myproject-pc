

require(["../scripts/conf/config.js"], function(){
	require(["jquery","public"], function($){
		$(function(){
			var num=0;
			var timer;
			timer = setInterval(function(){
				num++;
				num = num%5;
				changeflash(num);
			},5000)
			$('.flash-bar div').each(function(i,ele){
				$('.flash-bar div').eq(i).mouseover(function(){
					changeflash(i);
					clearInterval(timer);
					num = i;
				})
			})
			function changeflash(index){
				$('.flash-bar div').each(function(i,ele){
					ele.className='grey';
					$('.banner a').eq(i).css('display','none');
				})
				$('.flash-bar div').get(index).className='yellow';
				$('.banner a').eq(index).css('display','block');
			}
			$('.flash-bar').mouseout(function(){
				clearInterval(timer);
				timer = setInterval(function(){
					num++;
					num = num%5;
					changeflash(num);
				},5000)
			})
			//head图片的加载
			var str = 'var Info={"result":0,"msg":"ok","serverTime":1568637917,"logSerial":"DJC-ZBDAOJU-0916204517-pkG7a3-1-68125","data":[{"iCatId":"369","sCatIcon":"https:\/\/game.gtimg.cn\/images\/zb\/x5\/uploadImg\/goods\/201805\/20180508184947_59164.jpg","sCatName":"\u82f1\u96c4\u8054\u76df","sCatDesc":""},{"iCatId":"372","sCatIcon":"https:\/\/game.gtimg.cn\/images\/zb\/x5\/uploadImg\/goods\/201805\/20180508185107_96002.jpg","sCatName":"QQ\u98de\u8f66","sCatDesc":""},{"iCatId":"373","sCatIcon":"https:\/\/game.gtimg.cn\/images\/zb\/x5\/uploadImg\/goods\/201805\/20180508185120_63642.jpg","sCatName":"QQ\u70ab\u821e","sCatDesc":""},{"iCatId":"376","sCatIcon":"https:\/\/game.gtimg.cn\/images\/zb\/x5\/uploadImg\/goods\/201805\/20180508185156_53811.jpg","sCatName":"\u5929\u5929\u9177\u8dd1","sCatDesc":""}]};';
			var re = /[^=]+=/;
			str = str.replace(re,"");
			re = /;/
			str = str.replace(re,"").trim();
			str=JSON.parse(str).data ;
			for(var i=0; i<$('.mainul img').length; i++){
				$('.mainul img').eq(i).attr('src',str[i].sCatIcon);
			}
			$.ajax({
				url: "/apim/zbdaoju/time/js/actual_ad_index.js",
				type: "GET",
				success: function (data) {
					var re = /[^=]+=/;
					data = data.replace(re,"");
					re=/;/;
					data = data.replace(re,"").trim();
					data=JSON.parse(data)
					console.log(data);
					//banner图的加载
					for(var i=0; i<$('.banner img').length; i++){
						$('.banner img').eq(i).attr('src',data.index_eyes[i].sPicLink)
					}
					//商品图片、名称、价格的加载
					for(var i=0; i<$('.goods').length; i++){
						var index = 'index_goods_'+i;
						$('.goods').eq(i).find('h3').html(data[index][0].sName);
						$('.goods').eq(i).find('.h3-next').html(data[index][0].sNameDesc);
						for(var j=0; j<$('.goods').eq(i).find('img').length; j++){
							$('.goods').eq(i).find('img').eq(j).attr('src',data[index][j].sPicLink);
							if(j>=1){
								$('.goods').eq(i).find('.good-pri').eq(j-1).html('￥'+data[index][j].iPriceNew/100);
								$('.goods').eq(i).find('.good-name').eq(j-1).html(data[index][j].sDescribe);
							}
						}
						//for(var j=0; j<$('.goods .goos-list').eq(i).find('a').length; j++){
						//}
					}
					//console.log(data.index_goods_0[1].sLink);
					$('.goods .goos-list').eq(0).find('a').eq(0).attr('href','shouban.html?id='+data.index_goods_0[1].sLink+'&biz=cf');
					$('.goods .goos-list').eq(0).find('a').eq(1).attr('href','shouban.html?id='+data.index_goods_0[2].sLink+'&biz=bns');
					$('.goods .goos-list').eq(0).find('a').eq(2).attr('href','shouban.html?id='+data.index_goods_0[3].sLink+'&biz=lol');
					$('.goods .goos-list').eq(0).find('a').eq(3).attr('href','shouban.html?id='+data.index_goods_0[4].sLink+'&biz=speedm');


					$('.goods .goos-list').eq(1).find('a').eq(0).attr('href','shouban.html?id='+data.index_goods_1[1].sLink+'&biz=x5');
					$('.goods .goos-list').eq(1).find('a').eq(1).attr('href','shouban.html?id='+data.index_goods_1[2].sLink+'&biz=bns');
					$('.goods .goos-list').eq(1).find('a').eq(2).attr('href','shouban.html?id='+data.index_goods_1[3].sLink+'&biz=mxd');
					$('.goods .goos-list').eq(1).find('a').eq(3).attr('href','shouban.html?id='+data.index_goods_1[4].sLink+'&biz=cf');


					$('.goods .goos-list').eq(2).find('a').eq(0).attr('href','shouban.html?id='+data.index_goods_2[1].sLink+'&biz=lol');
					$('.goods .goos-list').eq(2).find('a').eq(1).attr('href','shouban.html?id='+data.index_goods_2[2].sLink+'&biz=lol');
					$('.goods .goos-list').eq(2).find('a').eq(2).attr('href','shouban.html?id='+data.index_goods_2[3].sLink+'&biz=bns');
					$('.goods .goos-list').eq(2).find('a').eq(3).attr('href','shouban.html?id='+data.index_goods_2[4].sLink+'&biz=pvpmall');


					$('.goods .goos-list').eq(3).find('a').eq(0).attr('href','shouban.html?id='+data.index_goods_3[1].sLink+'&biz=lol');
					$('.goods .goos-list').eq(3).find('a').eq(1).attr('href','shouban.html?id='+data.index_goods_3[2].sLink+'&biz=pvpmall');
					$('.goods .goos-list').eq(3).find('a').eq(2).attr('href','shouban.html?id='+data.index_goods_3[3].sLink+'&biz=lol');
					$('.goods .goos-list').eq(3).find('a').eq(3).attr('href','shouban.html?id='+data.index_goods_3[4].sLink+'&biz=cf');

					
				}
			});
			$.ajax({
				url: "/apim/zbdaoju/time/js/actual_index_nav.js?0.9526686564682743",
				type: "GET",
				success: function (data) {
					var re = /[^=]+=/;
					data = data.replace(re,"");
					re=/;/;
					data = data.replace(re,"").trim();
					data=JSON.parse(data)
					for(var i=0; i<$('.topnav-c ul a').length; i++){
						$('.topnav-c ul a').eq(i).html(data[i].sName);
						//$('.topnav-c ul a').eq(i).attr('href',data[i].sUrl);
					}
				}
			}) 
			$.ajax({
				url: "/apih/daoju/v3/zb/client/goods/GoodsApp.php?output_format=jsonp&opt_type=goods_list_by_ids&biz=zbdaoju&mall_ids=10241,9126,8375,8279,10241,5085,6894,6178,5580,8740,8287,8375,1065,8280,2141,8262,8629&_=1568645266297",
				type: "GET",
				success: function (data) {
					var re = /[^=]+=/;
					data = data.replace(re,"");
					re=/;/;
					data = data.replace(re,"").trim();
					data=JSON.parse(data).data.list;
				}
			})
		})
	})
})