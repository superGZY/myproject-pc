require(["../scripts/conf/config.js"], function(){
	require(["jquery","public"], function($){
        //修改购物车的数量
        if(JSON.parse(localStorage.getItem("buycar-mes"))){
            var num = JSON.parse(localStorage.getItem("buycar-mes")).length;
        }
        else{
            var num=0;
        }
        $('.navico-cartnum').get(0).innerHTML = num;
        $('.buycar-num').get(0).innerHTML = num;
        //console.log(window.location.href);
        var id= window.location.href;
        var re = /[^?]+\?/;
        id=id.replace(re,'');
        re=/[^&]+&/;
        biz = id.replace(re,'');
        re = /&[^&]+/;
        id=id.replace(re,'');
        $.ajax({
            url: "/api/daoju/v3/zb/client/goods/GoodsApp.php?output_format=jsonp&opt_type=goods_detail&version=2&channel=1&"+biz+"&mall_"+id+"&_=1568874736935",
            type: "GET",
            success: function (data) {
                var re = /[^=]+=/;
                var data = data.replace(re,"").trim();
                data=JSON.parse(data).data;
                //信息添加
                $('.pord-name').html(data.list.sMallName);  //标题
                $('.pord-tips').html(data.list.sMallBrief); //提示
                $('.pord-dispri strong').html((data.list.iCurrPrice/100).toFixed(2));  //新价格
                $('.pord-orpri').html('￥'+(data.list.iOriPrice/100).toFixed(2));      //旧价格
                $('.commentNum').html(data.list.iComments);                 //评论数量
                $('.pord-sold span').html(data.list.iTotalSoldNum);         //已售数量
                $('.good-imgs img').attr('src',data.list.sProfileImg);      //大图
                $('.comm-tit em').html(data.list.sMallName);                //当前位置
                var str = '<li class="active"><a><img src="'+data.list.sProfileImg+'"/></a></li>';
                for(var i=0; i<data.list.sDetailImg.length; i++){
                    str += '<li><a><img src="'+data.list.sDetailImg[i]+'"/></a></li>';
                }
                $('.picdetail-list').html(str);                  //小图添加
                $('.blk_detail_main_spec .pord-color label').html(data.related[0].attr[0].sAttrName);
                str='<li class="current" attrid="112"><div class="pord-selbox">'+data.related[0].attr[0].sAttrValue+'</div></li>'
                for(var i=1; i<data.related.length; i++){
                    str+='<li attrid="112"><div class="pord-selbox">'+data.related[i].attr[0].sAttrValue+'</div></li>'
                }
                $('.blk_detail_main_spec .pord-color ul').html(str);//档位添加
                $('.detailbox').html(data.list.sMallDesc)  //详情图添加

                str=`<li>
                        <label class="fl">商品名称:</label>
                        <span class="par-name">${data.list.sMallName}</span>
                    </li>
                    <li>
                        <label class="fl">商品毛重:</label>
                        <span class="par-name">${data.list.iGoodsWeight}g</span>
                    </li>
                    `
                $('.parameter ul').html(str);  //商品参数
                $('.pord-tab span').html(data.list.iComments);//评论数量
                chanagePic();
                mySize();
                changeNum();
            }
        });
        //点击切图事件
        function chanagePic(){
            for(var i=0; i<$('.picdetail-list li').length; i++){
                $('.picdetail-list li').eq(i).click(function(){
                    $('.good-imgs img').attr('src',$(this).find('img').attr('src'));
                    $('.active').removeClass('active');
                    $(this).addClass('active');
                })
            }
        }
        //选择属性事件
        function mySize(){
            for(var i=0; i<$('.pord-sellist li').length; i++){
                $('.pord-sellist li').eq(i).click(function(){
                    $('.current').removeClass('current');
                    $(this).addClass('current');
                })
            }
        }
        //选择数量事件
        function changeNum(){
            $('.pord-num .btn_detail_main_buy_min').click(function(){
                if($('.inpt_detail_main_buy_num').val()==1){
                    $('.inpt_detail_main_buy_num').val('1');
                }
                else{
                    $('.inpt_detail_main_buy_num').get(0).value--;
                }
                
            })
            $('.btn_detail_main_buy_plus').click(function(){
                $('.inpt_detail_main_buy_num').get(0).value++;
            })
        }
        //点击加入购物车事件
        $('#btn_detail_cart_add').click(function(){
            var name = document.cookie.split(';');
            var re=/username=/;
            var flg = false;
			for(var i=0; i<name.length; i++){
				if(name[i].search(re)!=-1){
                    flg = true;
                }
            }
            //未登录状态
            if(!flg){
                $('#login').click();
            }
            //登录状态
            if(flg){
                //alert('已添加至购物车了！');
                var win = new AddOver();
                win.init();
                win.show();
            }
        })
        //创建购物弹窗
        var  AddOver = (function(){
            var	instance = {
                    ele: document.createElement('div'),
                    mask:document.createElement('div'),
                    creatwindow : function(){
                        this.ele.id="addcar";
                        this.ele.innerHTML=`
                        <a class="popup-close">
                        <i class="comicon i-close"></i>
                    </a>
                    <div class="popup-main">
                        <h4>购物车提醒</h4>
                        <div class="popup-con">
                            <div class="popup-info clearfix">
                                <i class="fl comicon i-tick"></i>
                                <div class="fl popup-tip" id="blk_popup_detail_cart_msg">
                                    <p class="tip-success">商品已添加至购物车</p>
                                </div>
                            </div>
                            <div class="popup-btnbox">
                                <a class="fl popup-btn btn-sure mr20">确认</a>
                                <a class="fl popup-btn" id="next-shop">继续购物</a>
                            </div>
                        </div>
                    </div>
                        `
                        document.body.appendChild(this.ele);
                    },
                    creatmask : function(){
                        this.mask.className='mask';
                        document.body.appendChild(this.mask);
                    },
                    close:function(){
                        this.mask.style.display='none';
						this.ele.style.display='none';
                    },
                    show:function(){
                        this.mask.style.display='block';
						this.ele.style.display='block';
                    },
                    init : function(){
                        this.creatwindow();
                        this.creatmask();
                        $('.popup-close').click(()=>{
                            this.close();
                        })
                        //点击继续购物事件
                        $('#next-shop').click(()=>{
                            //修改购物车商品数量
                            $('.navico-cartnum').get(0).innerHTML =parseInt($('.navico-cartnum').get(0).innerHTML) +parseInt($('.inpt_detail_main_buy_num').val());
                            $('.buycar-num').get(0).innerHTML = $('.navico-cartnum').html();
                            this.close();
                        })
                    }
                }
            return function(){
                return instance;
            }
        })();
        //点击添加到购物车事件
        $('.joincart-btn').click(function(){
            addToloca();
        })
        //购物车加到location事件
        function addToloca(){
            var flg = false;
            var obj={
                "pordname":$('.pord-name').html(),
                "porddispri":$('.pord-dispri strong').html(),
                "pordorpri":$('.pord-orpri').html(),
                "pordsellist":$('.pord-sellist label').html(),
                "pordselbox":$('.current .pord-selbox').html(),
                "num":parseInt($('.inpt_detail_main_buy_num').val())
            }
            var arr =JSON.parse(localStorage.getItem("buycar-mes"));
            if(arr){
                for(var i=0; i<arr.length; i++){
                    if(arr[i].pordname == obj.pordname && arr[i].pordselbox == obj.pordselbox){
                        flg = true;
                        arr[i].num += obj.num;
                        break;
                    }
                }
            }
            else{
                var arr=[];
            }
            if(!flg){
                arr.push(obj);
            }
            localStorage.setItem("buycar-mes", JSON.stringify(arr))
        }
    })
})