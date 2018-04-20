var contextPath = 'https://www.plrt88.com/webservice';
var ins = {}; //用来接受易盾的实例

//处理易盾初始化
function YidunInitial(phoneNum) {
	initNECaptcha({
		captchaId: '38e6293480ca477486cecd9636cc1329',
		element: '#captcha',
		mode: 'float',
		width: "auto",
		onReady: function(instance) {
			// 验证码一切准备就绪，此时可正常使用验证码的相关功能
		},
		onVerify: function(err, data) {
			/**
			 * 第一个参数是err（Error的实例），验证失败才有err对象
			 * 第二个参数是data对象，验证成功后的相关信息，data数据结构为key-value，如下：
			 * {
			 *   validate: 'xxxxx' // 二次验证信息
			 * }
			 */
			// 点击登录按钮后可调用服务端接口，以下为伪代码，仅作示例用

			//data 存在表示成功
			if(data) {
				var NECaptchaValidate = data.validate;
				ajaxRequest(contextPath + "/wxuser/goGetCaptcha", "phoneNum=" + phoneNum + "&type=register" + "&NECaptchaValidate=" + NECaptchaValidate + "&captchaId=38e6293480ca477486cecd9636cc1329", goGetCaptcha);
			}
		}
	}, function onload(instance) {
		ins = instance;
	}, function onerror(err) {
		// 验证码初始化失败处理逻辑，例如：提示用户点击按钮重新初始化
	})

}

//拉取成功的回调
function goGetCaptcha(data) {
	if(data.rescode != "00000") {
		errorMessage(data.resmsg_cn);
		ins.destroy();
		return;
	}
	gainCodeSwitch = false;
	var curCount = 5;

	function SetRemainTime() {
		if(curCount == 0) {
			window.clearInterval(InterValObj); //停止计时器
			gainCodeSwitch = true;
			$(".getCode").html("重发验证码");
			$(".getCode").removeClass("forbid");
			ins.destroy();
		} else {
			curCount--;
			$(".getCode").html(curCount + "s");
			$(".getCode").addClass("forbid");
		}
	}
	InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
	errorMessage("验证码发送成功");
}

var gainCodeSwitch = true;

//获取验证码
$(".getCode").click(function() {

	if(!gainCodeSwitch) {
		return false;
	}
	var phoneNum = $("#phoneNum").val();
	if(phoneNum == "") {
		errorMessage("请输入手机号");
		return false;
	}
	if(!(phoneReg.test(phoneNum))) {
		errorMessage("请输入正确的手机号码");
		return false;
	}
	console.log("s")
	YidunInitial(phoneNum);
});

//立即注册
$(".btnNew").click(function() {
	$('.bgBlack').css('display', 'block');
	$('.wrap').css({
		height: "100vh",
		overflow: "hidden"
	})
	$('.bottom').slideUp();

})
//按钮叉
$('.delete').click(function() {
	$('.bgBlack').css('display', 'none');
	$('.wrap').css({
		height: "initial",
		overflow: "initial"
	})
	$('.bottom').slideDown();
})

//注册
$("#loginSubmit").click(function() {
	var password = $("#password").val();
	var checkCode = $("#checkCode").val();
	var phoneNum = $('#phoneNum').val();
	var channel = $("#channel").val();
	if(!$("#phoneNum").val()) {
		errorMessage("请输入手机号");
		return false;
	}
	if(!(/^((13|15|18|14|17|19|16)[0-9]{9})$/.test($("#phoneNum").val()))) {
		errorMessage("请输入正确的手机号码");
		return false;
	}
	if(!$("#checkCode").val()) {
		errorMessage("请输入短信验证码");
		return false;
	}
	if(password == null || password == '') {
		errorMessage("请设置登录密码");
		return false;
	}
	if(!(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9\!\@\#\$\^\*]{8,16})$/.test(password))) {
		errorMessage('登录密码为8~16位字母数字或符号组合');
		return false;
	}

	ajaxRequest(contextPath + "/wxuser/registerPassword", "phoneNum=" + phoneNum + "&password=" + password + "&checkCode=" + checkCode + "&channel=" + channel, passwordLevel, "POST");

});

//注册成功之后回调
function passwordLevel(data) {
	if(data.rescode == "00000") {
		errorMessage('注册成功');
	} else {
		errorMessage(data.resmsg_cn);
	}
}

//注册协议
$("#registerAgree").click(function() {
	ajaxRequest(contextPath + "/wxagreement/getServAgreementByType", "type=register&productId=107", setServAgreementByType, "GET");
})
var setServAgreementByType = function(data) {
	var u = navigator.userAgent,
		app = navigator.appVersion;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	var serAgreementUrl = data.serAgreementUrl;
	var flag = serAgreementUrl.indexOf(";");
	serAgreementUrl2 = serAgreementUrl.substring(0, flag);
	serAgreementUrl3 = serAgreementUrl.substring(flag + 1);
	if(data.resmsg != "success") {
		errorMessage(data.resmsg);
	} else {
		if(isiOS) {
			window.location.href = serAgreementUrl2;
		} else {
			window.location.href = serAgreementUrl3;
		}
	}
};