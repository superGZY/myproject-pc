require(["../scripts/conf/config.js"], function(){
	require(["jquery","public"], function($){
		$(function(){
            //游戏列表加载
            $.ajax({
                url: "/api/daoju/v3/zb/client/category/IpApp.php?opt_type=category_list&biz=zbdaoju&_r=0.8651784539610043&_=1568772583793",
                type: "GET",
                success: function (data) {
                    var re = /[^=]+=/;
                    var data = data.replace(re,"").trim();
                    data=JSON.parse(data)
                    var str="";
                    console.log(data);
                    for(var i=2; i<data.data.length; i++){
                        if(i==3){
                            str +='<dd class="cur" data-id="'+data.data[i].iCatId+'">'+data.data[i].sCatName+'</dd>';
                        }
                        else{
                            str +='<dd data-id="'+data.data[i].iCatId+'">'+data.data[i].sCatName+'</dd>';
                        }
                        
                    }
                    $('.dj_ipclass_ul').get(0).innerHTML +=str;
                    select();
                }
            });
            //第一页
            searchAjax(1,12,);
            //商品加载函数
            function searchAjax(i,n){
                $.ajax({
                    url: "/api/daoju/v3/zb/client/goods/GoodsApp.php?plat=pc&channel=1&opt_type=goods_list&biz=zbdaoju&page_no="+i+"&page_size="+n+"&jsonpName=product&cat_tag_id=369&cat_tag_type=ip&order_by=iRecRank&sort=desc&saleid=&keyword=&screen_type=0&filter=aba%2Cbns%2Ccf%2Ccfm%2Ccomicvip%2Ccqsj3d%2Cdnf%2Cgameshop%2Chx%2Clol%2Clr%2Cmxd2%2Cpao%2Cpoe%2Cpubg%2Cyxzj%2Crl%2Cseiya%2Cshihun%2Cspeed%2Cspeedm%2Cswy%2Ctps%2Cwezd%2Cwmsj%2Cwuxia%2Cx5%2Cx52%2Cx5m%2Cxx%2Cxxsy&_=1568804175593",
                    type: "GET",
                    success: function (data) {
                        var re = /[^=]+=/;
                        data = data.replace(re,"");
                        re=/;/;
                        data = data.replace(re,"").trim();
                        data=JSON.parse(data).data.list;
                        var str='';
                        //商品结构加载
                        for(var i=0; i<data.length; i++){
                            str+='<li><a href=""><div class="ico-comm i-mark"><span class="mark-txt">新品</span></div><img src="'+data[i].sProfileImg+'" /><div class="good-info"><p class="good-name">'+data[i].sMallName+'</p><div class="good-pri"><span class="new-pri">￥'+data[i].iPrice/100+'</span><span class="old-pri">￥'+data[i].iOriPrice/100+'</span></div></div></a></li>'
                        }
                        $('#dj_goods_ul').html(str);
                    }
                })
            }
            //换页
            function changePage(ele){
                if($(ele).find('a').attr('page')>=3){
                    $('.active').removeClass('active');
                    $('.page_btn').eq(2).addClass('active');
                    for(var i=0; i<5; i++){
                        $('.page_btn').find('a').eq(i).html($(ele).find('a').attr('page')-2+i);
                    }
                    for(var i=0; i<5; i++){
                        $('.page_btn').find('a').eq(i).attr('page',$(ele).find('a').attr('page')-2+i)
                    }
                }
                else{
                    $('.active').removeClass('active');
                    $(ele).addClass('active');
                }
                searchAjax($(ele).find('a').attr('page'),12);
            }
            for(var i=0; i<$('.page_btn').length; i++){
                $('.page_btn').eq(i).on('click',function(){
                    changePage(this);
                })
            }
            //左右切换
            $('.p_next').click(function(){
                for(var i=0; i<5; i++){
                    if($('.page_btn').eq(i).hasClass('active')){
                        changePage($('.page_btn').eq(i+1));
                        break;
                    }
                }
            })
            $('.p_prev').click(function(){
                for(var i=0; i<5; i++){
                    if($('.page_btn').eq(i).hasClass('active')){
                        changePage($('.page_btn').eq(i-1));
                        break;
                    }
                }
            })
            //筛选
            function select (){
                for(var i=1; i<$('.dj_ipclass_ul dd').length; i++){
                    $('.dj_ipclass_ul dd').eq(i).click(function(){
                        $('.cur').removeClass('cur');
                        $(this).addClass('cur');
                        $.ajax({
                            url: "/api/daoju/v3/zb/client/goods/GoodsApp.php?plat=pc&channel=1&opt_type=goods_list&biz=zbdaoju&page_no=1&page_size=12&jsonpName=product&cat_tag_id="+$(this).attr('data-id')+"&cat_tag_type=ip&order_by=iRecRank&sort=desc&saleid=&keyword=&screen_type=0&filter=aba%2Cbns%2Ccf%2Ccfm%2Ccomicvip%2Ccqsj3d%2Cdnf%2Cgameshop%2Chx%2Clol%2Clr%2Cmxd2%2Cpao%2Cpoe%2Cpubg%2Cyxzj%2Crl%2Cseiya%2Cshihun%2Cspeed%2Cspeedm%2Cswy%2Ctps%2Cwezd%2Cwmsj%2Cwuxia%2Cx5%2Cx52%2Cx5m%2Cxx%2Cxxsy&_=1568815844817",
                            type: "GET",
                            success: function (data) {
                                var re = /[^=]+=/;
                                data = data.replace(re,"");
                                re=/;/;
                                data = data.replace(re,"").trim();
                                data=JSON.parse(data).data; 
                                console.log(data);
                                //商品结构加载
                                var str='';
                                for(var i=0; i<data.list.length; i++){
                                    str+='<li><a href=""><div class="ico-comm i-mark"><span class="mark-txt">新品</span></div><img src="'+data.list[i].sProfileImg+'" /><div class="good-info"><p class="good-name">'+data.list[i].sMallName+'</p><div class="good-pri"><span class="new-pri">￥'+data.list[i].iPrice/100+'</span><span class="old-pri">￥'+data.list[i].iOriPrice/100+'</span></div></div></a></li>'
                                }
                                $('#dj_goods_ul').html(str);
                                var pages = Math.ceil(data.total/12);
                                console.log(pages);
                                var str='<span class="p_prev"><a><i class="ico-center ico-arrleft"></i></a></span>'
                                for(var i=1; i<=pages; i++){
                                    str+='<span class="page_btn"><a page="'+i+'">'+i+'</a></span>'
                                }
                                str+='<span class="p_next"><a><i class="ico-center ico-arrright"></i></a></span>'
                                $('#page_wrapper').html(str);
                                $('.page_btn').eq(0).addClass('active');
                            }
                        })
                    })
                }
            } 
        })
    })
})