require(["../scripts/conf/config.js"], function(){
	require(["jquery","public"], function($){
        //$('.topnav-c ul').html()
        var arr =JSON.parse(localStorage.getItem("buycar-mes"));
        if(arr){
            for(var i=0; i<arr.length; i++){
                $('.mycart-list').get(0).innerHTML +=
                `
                        <div class="mycart-item">
                            <div class="mycart-item-tb">
                                <div class="mycart-item-row cartlist clearfix">
                                    <div class="fl sp-1">
                                        <span class="goodscheck input-check checked" data-index="${i}"><i></i></span>
                                    </div>
                                    <div class="fl sp-2">
                                        <div class="mycart-item-img">
                                            <a href="${arr[i].pagesrc}"><img src="${arr[i].src}"/></a>
                                        </div>
                                    </div>
                                    <div class="fl sp-3">
                                        <p>
                                            <a href="${arr[i].pagesrc}">
                                                <span>${arr[i].pordname}</span>
                                            </a>
                                        </p>
                                    </div>
                                    <div class="fl sp-4">
                                        <div class="mycart-item-sel disabled">
                                            <p>${arr[i].pordsellist}:<span class="mychoose">${arr[i].pordselbox}</span></p>
                                        </div>
                                    </div>
                                    <div class="fl sp-5">
                                        <p class="mycart-item-per">
                                            <s>${arr[i].pordorpri} 元</s>
                                            <span class="newPrice">${arr[i].porddispri}</span>元
                                        </p>
                                    </div>
                                    <div class="fl sp-6">
                                        <div class="mycart-item-count">
                                            <span class="num-minus btn_cart_list_buy_min">-</span>
                                            <input class="inpt_cart_list_buy_num" value="${arr[i].num}"/>
                                            <span class="num-plus btn_cart_list_buy_plus">+</span>
                                        </div>
                                    </div>
                                    <div class="fl sp-7">
                                        <p class="mycart-item-price">${(arr[i].porddispri*arr[i].num).toFixed(2)}元</p>
                                    </div>
                                    <div class="fl sp-8">
                                        <div class="mycart-item-tg">
                                            <a class="btn-del">删除</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
            `
            }
        }
        
        //选择框点击事件
        $('.input-check').click(function(){
            $(this).toggleClass("checked");
            count();
        })
        $('.input-check').eq(0).click(function(){
            if(($('.input-check').eq(0).hasClass('checked'))){
                for(var i=0; i<$('.input-check').length; i++){
                    $('.input-check').eq(i).addClass('checked');
                }
            }
            else{
                for(var i=0; i<$('.input-check').length; i++){
                    $('.input-check').eq(i).removeClass('checked');
                }
            }
            count();
        })
        //数量切换事件
        for(var i=0; i<$('.btn_cart_list_buy_min').length; i++){
            $('.btn_cart_list_buy_min').get(i).index = i;
            $('.btn_cart_list_buy_min').eq(i).click(function(){
                if($('.inpt_cart_list_buy_num').get(this.index).value == 1){
                    $('.inpt_cart_list_buy_num').get(this.index).value = 1
                }
                else{
                    $('.inpt_cart_list_buy_num').get(this.index).value--;
                    $('.mycart-item-price').eq(this.index).html(($('.newPrice').eq(this.index).html()*$('.inpt_cart_list_buy_num').eq(this.index).val()).toFixed(2)+'元');
                    arr =JSON.parse(localStorage.getItem("buycar-mes"));
                    for(var i=0; i<arr.length; i++){
                        if(arr[i].pordname ==$('.sp-3 span').eq(this.index).html() && arr[i].pordselbox == $('.mychoose').eq(this.index).html()){
                            arr[i].num = $('.inpt_cart_list_buy_num').get(this.index).value;
                            break;
                        }
                    }
                    localStorage.setItem("buycar-mes", JSON.stringify(arr));
                    count();
                }
            })
        }
        for(var i=0; i<$('.btn_cart_list_buy_plus').length; i++){
            $('.btn_cart_list_buy_plus').get(i).index = i;
            $('.btn_cart_list_buy_plus').eq(i).click(function(){
                $('.inpt_cart_list_buy_num').get(this.index).value++;
                $('.mycart-item-price').eq(this.index).html(($('.newPrice').eq(this.index).html()*$('.inpt_cart_list_buy_num').eq(this.index).val()).toFixed(2)+'元');
                arr =JSON.parse(localStorage.getItem("buycar-mes"));
                for(var i=0; i<arr.length; i++){
                    if(arr[i].pordname ==$('.sp-3 span').eq(this.index).html() && arr[i].pordselbox == $('.mychoose').eq(this.index).html()){
                        arr[i].num = $('.inpt_cart_list_buy_num').get(this.index).value;
                        break;
                    }
                }
                localStorage.setItem("buycar-mes", JSON.stringify(arr));
                count();
            })
        }
        //删除
        for(var i=0; i<$('.btn-del').length; i++){
            $('.btn-del').get(i).index = i;
            $('.btn-del').eq(i).click(function(){
                console.log(this.index);
                $('.mycart-list').find('.mycart-item').eq(this.index).remove();
                arr =JSON.parse(localStorage.getItem("buycar-mes"));
                for(var i=0; i<arr.length; i++){
                    if(arr[i].pordname ==$('.sp-3 span').eq(this.index).html() && arr[i].pordselbox == $('.mychoose').eq(this.index).html()){
                        arr.splice(i-1,1);
                        break;
                    }
                }
                localStorage.setItem("buycar-mes", JSON.stringify(arr));
                publicCar();
                count();
            })
        }
        //结算的件数
        count();
        function count (){
            var count = 0;
            var price = 0;
            for(var i=0; i<$('.mycart-item  .input-check.checked').length; i++){
                var index = $('.mycart-item  .input-check.checked').eq(i).attr("data-index");
                count +=parseInt($('.mycart-item .inpt_cart_list_buy_num').eq(index).val());
                price +=parseInt($('.mycart-item-price').eq(index).html());
            }
            $('.total').html(count);
            $('.money').html(parseInt(price).toFixed(2)+'元');
        }
        //结算成功
        $('.mycart-tb-btn').click(function(){
            alert('结算成功！');
            arr =JSON.parse(localStorage.getItem("buycar-mes"));
            for(var i=0; i<$('.mycart-item  .input-check.checked').length; i++){
                var index = $('.mycart-item  .input-check.checked').eq(i).attr("data-index");
                $('.btn-del').eq(index).click();
            }
            localStorage.setItem("buycar-mes", JSON.stringify(arr));
        })
        
        //顶部购物车数量刷新
		function publicCar (){
			if(JSON.parse(localStorage.getItem("buycar-mes"))){
				var num = JSON.parse(localStorage.getItem("buycar-mes")).length;
			}
			else{
				var num=0;
			}
			$('.buycar-num').get(0).innerHTML = num;
		}
    })
})