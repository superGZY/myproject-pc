require(["../scripts/conf/config.js"], function(){
	require(["jquery"], function($){
		$(function(){
            $('#name').blur(function(){
                if($('#name').val()==""){
                    $('.error-tips').eq(0).css('display','block');
                    $('.error-tips').eq(0).html('昵称不可以为空');
                    $('.submit').attr("disabled",true);
                }
                else{
                    $('.error-tips').eq(0).css('display','none');
                    $('.submit').attr("disabled",false);
                }
            })
            $('#pwd').blur(function(){
                if($('#pwd').val()==""){
                    $('.password-tips-group').css('display','none');
                    $('.error-tips').eq(1).css('display','block');
                    $('.error-tips').eq(1).html('密码不可以为空');
                    $('.submit').attr("disabled",true);
                }
                else{
                    $('.error-tips').eq(1).css('display','none');
                    $('.submit').attr("disabled",false);
                }
                if(!$('.password-tips').eq(0).hasClass('ok')){
                    $('.password-tips-group').css('display','none');
                    $('.error-tips').eq(1).css('display','block');
                    $('.error-tips').eq(1).html('不能包括空格');
                    $('.submit').attr("disabled",true);
                }
                else if(!$('.password-tips').eq(1).hasClass('ok')){
                    $('.password-tips-group').css('display','none');
                    $('.error-tips').eq(1).css('display','block');
                    $('.error-tips').eq(1).html('长度为8-16个字符');
                    $('.submit').attr("disabled",true);
                }
                else if(!$('.password-tips').eq(2).hasClass('ok')){
                    $('.password-tips-group').css('display','none');
                    $('.error-tips').eq(1).css('display','block');
                    $('.error-tips').eq(1).html('必须包含字母、数字、符号中至少2种');
                    $('.submit').attr("disabled",true);
                }
                else{
                    $('.submit').attr("disabled",false);
                }
            })
            $('#pwd').focus(function(){
                $('.password-tips-group').css('display','block');
                $('.error-tips').eq(1).css('display','none');
            })
            $('#pwd').on('input', function(){
                var lv=0;
				if(/[0-9]/.test($('#pwd').val())){
					lv++;
				}
				if(/[a-zA-Z]/.test($('#pwd').val())){
					lv++;
				}
				if(/[^0-9a-zA-Z_]/.test($('#pwd').val())){
					lv++;
                }
                if(lv>=2){
                    $('.password-tips').eq(2).addClass('ok');
                }
                else{
                    $('.password-tips').eq(2).removeClass('ok');
                }
                if ($('#pwd').val().indexOf(" ") >=0){
                    $('.password-tips').eq(0).removeClass('ok');
                }
                else{
                    $('.password-tips').eq(0).addClass('ok');
                }
                if($('#pwd').val().length>=8 && $('#pwd').val().length<=16){
                    $('.password-tips').eq(1).addClass('ok');
                }
                else{
                    $('.password-tips').eq(1).removeClass('ok');
                }
            })
        })
        $('#tel').blur(function(){
            var patrn = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
            if( $('#tel').val().search(patrn) == -1){
                $('.error-tips').eq(2).css('display','block');
                $('.submit').attr("disabled",true);
            }           
            else{
                $('.error-tips').eq(2).css('display','none');
                $('.submit').attr("disabled",false);
            }                                                                                                                                                                                         
        })
        $('#tel').on('input',function(){
            $('.error-tips').eq(2).css('display','none');
            $('.submit').attr("disabled",false);
        })
        $('.submit').click(function(){
            for(var i=0; i<$('input').length-1; i++){
                $('input').get(i).blur();
            }
            alert("注册成功！");
            //window.open("http://localhost:8000/pages/index.html","_self");
        })
    })
})