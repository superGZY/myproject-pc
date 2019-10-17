require(["../scripts/conf/config.js"], function(){
	require(["jquery"], function($){
        //创建商品数据函数
		function creatGoodstitle(data){
			for(var i=0; i<10; i++){
				$('.allgoods-ul').append(`
					<li class="menu-li">
						<a class="menua-header">
							<img
								src="${data[i].sCatIcon}" />
							<p>${data[i].sCatName}</p>
						</a>
						<ul class="iCatul" data-iCatId="${data[i].iCatId}">
						</ul>
					</li>
				`)
			}
		}
		function creatGoodsli(data){
			for(var i=0; i<10; i++){
				for(var j=10; j<data.length; j++){
					if(data[j].iParentId == $('.iCatul').eq(i).attr('data-iCatId')){
						$('.iCatul').eq(i).append(`
							<li>${data[j].sCatName}</li>
						`)
					}
				}
			}
		}
		$(function(){
			//登录状态
			var name = document.cookie.split(';');
			var re=/username=/;
			for(var i=0; i<name.length; i++){
				if(name[i].search(re)!=-1){
					name[i] = name[i].replace(re,'').trim();
					$('.unlogin').css('display','none');
					$('.login').css('display','block');
					$('#login-log').html(name[i]);
				}
			}
			
			//个人信息显示
			$('.login').mouseover(function(){
				$('.top-hover').css('display','block');
			})
			$('.top-hover').mouseover(function(){
				$('.top-hover').css('display','block');
			})
			$('.top-hover').mouseout(function(){
				$('.top-hover').css('display','none');
			})
			$('.login').mouseout(function(){
				$('.top-hover').css('display','none');
			})
			//商品展示
            $('#topmenu-goods').mouseenter(function(){
				if($('.allgoods-ul').get(0).innerHTML.trim()==""){
					$.ajax({
						url: "/api/daoju/v3/zb/client/category/ClassApp.php?output_format=jsonp&opt_type=category_list&biz=zbdaoju&_=1568623887627",
						type: "GET",
						success: function (data) {
							var re = /[^=]+=/;
							var data = data.replace(re,"").trim();
							var data=JSON.parse(data).data
							creatGoodstitle(data);
							creatGoodsli(data);
						}
					});
				}
				$('.top-menu').css('display','block');
			})
			$('#topmenu-goods').mouseleave(function(){
				$('.top-menu').css('display','none');
			})
			//创建登录窗函数
			var  Logwin = (function(){
				var	instance = {
						ele: document.createElement('div'),
						mask:document.createElement('div'),
						creatwindow : function(){
							this.ele.id="logwindow";
							this.ele.innerHTML=`
								<div class="logwin-top">
								<ul>
									<li class="fl qqblue" id="qqblue">
										<a class="qqlog">
											<i class="qqlogo-ico logimg"></i>
											<span>QQ账号登录</span>
										</a></li>
									<li class="fl wxgreen" id="wxgreen">
										<a class="wxunlog">
											<i class="wxlogo-ico logimg"></i>
											<span>微信账号登录</span>
										</a></li>
									</li>
									<a class="log-close logimg"></a>
								</ul>
							</div>
							<div class="logwin-tips">微信和QQ是两个独立账号，账号信息不互通</div>
							<div style="display:block" class="logqq">
								<div class="logwin-con-qq" >
									<div class="log-qq-title">快速安全登录</div>
									<div class="log-qq-tips1">请使用<a>QQ手机版</a>扫描二维码,<br/>或点击头像授权登录。</div>
									<div class="log-qq-img"><img src=""/></div>
								</div>
								<div class="logwin-bottom logwin-qq-bottom">
									<a id="logmeth3">账号密码登录</a>
									<span>|<span>
									<a id="freecount" href="./zhuce.html" target="_blank">注册新帐号</a>
									<span>|<span>
									<a>意见反馈</a>
								</div>
							</div>
							
							<div style="display:none" class="logwx">
								<div class="logwin-con-wx">
									<div class="log-wx-title">微信登录</div>
									<div class="log-wx-img"><img src="../static/images/011UctnULri-rwwP.jpg"/></div>
								</div>
								<div class="logwin-bottom logwin-wx-bottom">
									<p>请使用微信扫描二维码登录</p>
									<p>“聚诚品”</p>
								</div>
							</div>
							<div class="log-namepwd" style="display:none">
								<div class="logwin-con-np" >
									<div class="log-qq-title">帐号密码登录</div>
									<div class="log-qq-tips1" id="logmeth1">推荐使用<a>快速安全登录</a>，防止盗号。</div>
									<div class="logform">
										<div class="error-tips" style="display:none">
											<span class="error-logo"></span>
											<span class="error-m">请输入正确的帐号!</span>
										</div>
										<form>
											<div class="inp-name">
												<div class="name border">
													<input id="username" type="text" class="inpstyle" required  placeholder="支持QQ号/邮箱/手机号登录"/>
													<a class="uin-del" href="javascript:void(0)" style="display:none"></a>
												</div>
												
											</div>
											<div class="inp-pwd">
												<div class="pwd border">
													<input id="pwd" type="password" class="inpstyle" required  placeholder="密码"/>
													<a class="uin-del" href="javascript:void(0)" style="display:none"></a>
												</div>
											</div>
											<div class="submit">
												<div type="submit" />登录</div>
											</div>
										</form>
									</div>
								</div>
							</div>
							`
							document.body.appendChild(this.ele);
						},
						close : function(){
							this.mask.style.display='none';
							this.ele.style.display='none';
						},
						show : function(){
							this.mask.style.display='block';
							this.ele.style.display='block';
						},
						wxgreen : function(){
							$('#wxgreen').css('background','#4ab218');
							$('.qqlog').addClass('qqunlog') ;
							$('.wxunlog').addClass('wxlog');
							$('.logqq').css('display','none');
							$('.log-namepwd').css('display','none');
							$('.logwx').css('display','block');
						},
						qqblue : function(){
							$('#wxgreen').css('background','');
							$('.qqlog').removeClass('qqunlog') ;
							$('.wxunlog').removeClass('wxlog') ;
							$('.logqq').css('display','block');
							$('.logwx').css('display','none');
							$('.log-namepwd').css('display','none');
						},
						lognamepwd : function(){
							$('#wxgreen').css('background','');
							$('.qqlog').removeClass('qqunlog') ;
							$('.wxunlog').removeClass('wxlog') ;
							$('.logqq').css('display','none');
							$('.logwx').css('display','none');
							$('.log-namepwd').css('display','block');
						},
						creatmask : function(){
							this.mask.className='mask';
							document.body.appendChild(this.mask);
						},
						init : function(){
							this.creatwindow();
							this.creatmask();
							$('#wxgreen').click(()=>{
								this.wxgreen();
							})
							$('#qqblue').click(()=>{
								this.qqblue();
							})
							$('#logmeth3').click(()=>{
								this.lognamepwd();
							})
							$('#logmeth1').click(()=>{
								this.qqblue();
							})
							$('.log-close').click(()=>{
								this.close();
							})
						}
					}
				return function(){
					return instance;
				}
			})();
			//Logwin结束
			$('#login').click(function(){
				var win = new Logwin();
				win.init();
				win.show();
				//登录事件
				$('.submit div').click(function(){
					var username = localStorage.getItem('username');
					var pwd = localStorage.getItem('password');
					if(username == $('#username').val() && pwd==$('#pwd').val()){
						var Days = 3;
						var exp = new Date();
						exp.setTime(exp.getTime() + Days*24*60*60*1000);//过期时间
						document.cookie = 'username='+$('#username').val()+";expires=" + exp.toGMTString();
						document.cookie = 'password='+$('#pwd').val()+";expires=" + exp.toGMTString();
						location.reload()
					}
					else{
						alert('用户名或密码错误');
					}
				})
				//登录输入框监听事件
				$('#username').blur(function(){
					if(!$('#username').val()=='')
						$('.uin-del').eq(0).css('display','block');
					else
						$('.uin-del').eq(0).css('display','none');
				})
				$('#pwd').blur(function(){
					if(!$('#pwd').val()=='')
						$('.uin-del').eq(1).css('display','block');
					else
						$('.uin-del').eq(1).css('display','none');
				})
				//输入事件
				$('#username').on('input',function(){
					$('.uin-del').eq(0).css('display','block');
				})
				$('#pwd').on('input',function(){
					$('.uin-del').eq(1).css('display','block');
				})
				//删除内容事件
				$('.uin-del').eq(0).click(function(){
					$('#username').val("");
					$('.uin-del').eq(0).css('display','none');
				})
				$('.uin-del').eq(1).click(function(){
					$('#pwd').val("");
					$('.uin-del').eq(1).css('display','none');
				})
			})
			//导航栏固定
			window.onscroll = function(){
				if(window.pageYOffset >= 600){
					$('#topWrap').addClass('topfixed');
				}
				else{
					$('#topWrap').removeClass('topfixed');
				}
			} 
			//退出登录
			$('.quit').click(function(){
				var exp = new Date();
				exp.setTime(exp.getTime() - 1);
				var name=document.cookie.split(';')[1];	
				if(name){
					name = name.replace(re,'').trim();
					document.cookie = 'username='+name+";expires=" + exp.toGMTString();
					location.reload();
				}		
			})
        })
    })
})