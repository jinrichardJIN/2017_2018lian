function boxwWrap(obj) {
	var defaultO = {
		title: '提示', 			//标题
		buttonName: '确定', 		//按钮内容
		tip: '', 				//是否有提示语
		modelHtml: '', 			//是否需要内嵌模板
		method: function() { 	//回调方法
			console.log('zhixing')
		},
		params:''				//参数
	}
	var Option = Object.assign({}, defaultO, obj);

	//dom 添加
	var html = '';
	html = '<div id="ContainerWrap" class="width100 height100P positionF" id="alertBox" style="background:rgba(0,0,0,0.5);left:0;top:0;z-index: 1001;line-height:25px;">' +
		'<div id="slideTip" class="radius5 whiteBkg width80 positionA textC" style="transition: 0.5s 0s;transform:translateY(-50%);left:10%;top:50%;margin-top: -25px; box-shadow: 0px 0px 3px #666;font-size:12px;">' +
		'<p style="font-size:0.34rem;margin-top:0.3rem;padding-bottom: 0.3rem;border-bottom:1px solid gainsboro;">' +
		Option.title +
		'</p>' +
		'<p style="padding-top:0.35rem;font-size:0.3rem;color:#666666;">' +
		Option.tip +
		'</p>' +
		Option.modelHtml +
		'<span id="buttonMethod" style="color:#ffffff;display:block;background:#FF5240;font-size:0.3rem;width:40%;line-height:0.8rem;border-radius:8px;margin-left:30%; margin-top:0.4rem;margin-bottom:0.4rem;">' +
		Option.buttonName +
		'</span>' +
		'<img id="closePassWord"   src="../img/closeBoxBtn.png" / style="display:block;position:absolute;left:50%;bottom:-50px;transform:translateX(-50%);width:0.54rem">' +
		'</div>' +
		'</div>';

	$("body").append(html);
	setTimeout(function() {
		$('#slideTip').css('top', '50%');
	});
	$('#closePassWord').click(function() {
		$('#ContainerWrap').remove();
	})
	$('#buttonMethod').click(function() {
		Option.method(Option.params);
		$('#ContainerWrap').remove();
	})

}

//iconAlertBox()		使用示例：method输入密码之后的回调，method(password)

function iconAlertBox(method) {
	//config
	method = method || function() {

	};

	//dom 添加
	var html = '';
	html = '<div id="ContainerWrap" class="width100 height100P positionF" id="alertBox" style="background:rgba(0,0,0,0.5);left:0;top:0;z-index: 1001;line-height:25px;">' +
		'<div id="slideTip" class="radius5 whiteBkg width80 positionA textC" style="transition: 0.5s 0s;transform:translateY(-50%);left:10%;top:150%;margin-top: -25px; box-shadow: 0px 0px 3px #666;font-size:12px;">' +
		'<dt class="dHead" style="text-align:center;font-size:16px;padding-top:10px;">请输入交易密码</dt>' +
		'<dd id="publish_selection" style="width:80%;display:flex;justify-content:space-around;padding-bottom:20px;" class="blockC">' +
		'<input type="tel" class="iIpt_lg" maxlength="1">' +
		'<input type="tel" class="iIpt_lg " maxlength="1">' +
		'<input type="tel" class="iIpt_lg " maxlength="1">' +
		'<input type="tel" class="iIpt_lg " maxlength="1">' +
		'<input type="tel" class="iIpt_lg " maxlength="1">' +
		'<input type="tel" class="iIpt_lg " maxlength="1">' +
		'</dd>' +
		'<img id="closePassWord" src="../img/closeBoxBtn.png"/ style="display:block;position:absolute;left:50%;bottom:-65px;transform:translateX(-50%);width:40px">' +
		'</div>' +

		'</div>';

	$("body").append(html);
	setTimeout(function() {
		$('#slideTip').css('top', '50%');
	});

	//js初始化
	(function() {
		$('#closePassWord').click(function() {
			$('#ContainerWrap').remove();
		})

		/*添加号段中的组件**/
		var virtualPassWord = {
			inputs: $('#publish_selection input'), //input集合
			active: 0, //当前状态
		}
		//监听键盘事件  ---------所有的绑定按下输入进入下一个
		virtualPassWord["inputs"].on('click', function() {
			virtualPassWord["inputs"].eq(virtualPassWord.active).removeAttr('readonly', '').attr('type', 'tel').focus();
		});

		virtualPassWord["inputs"].on('keyup', function(event) {
			var e = window.event || event,
				_this = this,
				index = $(this).index(), //用来限制最后和开始的动作
				CodeKey = e.keyCode || e.which;

			if(/^\d+$/.test(this.value)) { //如果内容不为空且不为汉字						
				if(index != 5) {
					$(this).attr('readonly', '');
					$(this).attr('type', 'password');
					_this.nextElementSibling.focus();
					virtualPassWord.active++;
				} else {
					//获取密码执行回调
					var tmpPassWord = '';
					virtualPassWord["inputs"].each(function() {
						tmpPassWord += $(this).val();
					})
					method(tmpPassWord);
					$('#ContainerWrap').remove();
				}
			} else if(CodeKey == 8) { //删除按钮
				if(index != 0) {
					var next = $(this).next().val();
					if(!next) {
						virtualPassWord.active--;
						$(this).prev().attr('type', 'tel');
						$(this).prev().removeAttr('readonly', 'none');
						_this.previousElementSibling.focus();
						$(this).prev().val('');
						if(index == 5) {
							$(this).attr('type', 'tel');
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
}