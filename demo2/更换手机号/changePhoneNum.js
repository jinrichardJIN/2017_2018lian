(function() {
	var data = {
		code: 15900854189,
		
	}

	//网易易盾变量
	var ins;
	var verificationStatus = true;

	//获取验证码
	$('#getCode').click(function() {
		//网易云盾
		if(verificationStatus) {
			alertVerification('', data.code, 'wxlogin');
		} else {
			$('#Verification').show();
			$("#verificationStatus").html('');
		}
	})

	//易盾图形完成验证后回调
	var InterValObj;
	var getCodeSwitch = true;

	function goGetCaptcha(data) { //网易易盾回调
		//网易易盾
		$('#Verification').hide();
		verificationStatus = false;

		if(data.rescode != "00000") {
			ins.refresh();
			errorMessage(data.resmsg_cn);
			return;
		}
		getCodeSwitch = false;
		var curCount = 60;

		function SetRemainTime() {
			if(curCount == 0) {
				window.clearInterval(InterValObj); //停止计时器
				getCodeSwitch = true;
				$("#getCode").html("重发验证码");
				$("#getCode").removeClass("forbid");
				ins.refresh();
			} else {
				curCount--;
				$("#getCode").html(curCount + "s");
				$("#getCode").addClass("forbid");
			}
		}
		InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
		errorMessage("验证码发送成功");
	}

	//下一步
	$('#next').click(function() {
//			var id = $('#id').val().toString();
//			var loginPassword = $('#loginPassword').val();
//			
//			if(!id) {
//				errorMessage("身份证号码不能为空");
//				return false;
//			}
//			if(!(/^(\d{14}(\d|X|x)$|^\d{18}$|^\d{17}(\d|X|x))$/).test(id)) {
//				errorMessage("请输入正确的身份证号码");
//				return false;
//			}
//			if(loginPassword == '' || loginPassword == null) {
//				errorMessage("请输入登录密码");
//				return false;
//			}
//			if(loginPassword.length < 8) {
//				errorMessage('登录密码为8~16位字母数字或符号的组合');
//				return false;
//			}
//			if(!(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9\!\@\#\$\%\^\&\*]{8,16})$/.test(loginPassword))) {
//				errorMessage('登录密码为8~16位字母数字或符号的组合');
//				return false;
//			}	
			$('#container').css('display','block');
			setTimeout(function(){
				$('#slideTip').css('top', '50%');
			},500)
	});
	
	//取消
	$('#cancel').click(function(){
		$('#container').css('display','none');
		$('#slideTip').css('top','150%');
	});
	
	//确定
	$("#sure").click(function(){
		//zhixing
		$('#container').css('display','none');
		$('#slideTip').css('top','150%');
	});
	
	
	

	//验证码自动
	//js初始化
	(function() {
		/*添加号段中的组件**/
		var virtualPassWord = {
			inputs: $('#publish_selection input'), //input集合
			active: 0, //当前状态
		}
		//监听键盘事件  ---------所有的绑定按下输入进入下一个
		virtualPassWord["inputs"].on('click', function() {
			virtualPassWord["inputs"].eq(virtualPassWord.active).removeAttr('readonly', '').focus();
			virtualPassWord["inputs"].eq(virtualPassWord.active)[0].type = 'tel';
		});

		virtualPassWord["inputs"].on('keyup', function(event) {
			var e = window.event || event,
				_this = this,
				index = $(this).index(), //用来限制最后和开始的动作
				CodeKey = e.keyCode || e.which;

			if(/^\d+$/.test(this.value)) { //如果内容不为空且不为汉字
				if(index != 3) {
					$(this).attr('readonly', '');
					_this.nextElementSibling.focus();
					var _this = this;
					virtualPassWord.active++;
				} else {
					//获取密码执行回调
					var tmpPassWord = '';
					virtualPassWord["inputs"].each(function() {
						tmpPassWord += $(this).val();
					})
					$(this).blur();
				}
			} else if(CodeKey == 8) { //删除按钮
				if(index != 0) {
					var next = $(this).next().val();
					if(!next) {
						virtualPassWord.active--;
						this.previousElementSibling.type = 'tel';
						this.type = 'tel';
						$(this).prev().removeAttr('readonly', 'none');
						_this.previousElementSibling.focus();
						$(this).prev().val('');
						if(index == 3) {
							this.type = 'tel';
						}
					} else {

					}
				}
			} else {
				this.value = '';
				return;
			}
		});
	})()

})()