//提取收益
$('#extractionIncome').click(function() {
	$(this).css('background', '#ff5959');
	$(this).css('color', '#ffffff');
	$('#alertBoxShow').css('color', '#ff5959');
	$('#alertBoxShow').css('background', '#ffffff');

	$('.alertBoxLJTwo').show();
})

//确定提取收益
$('#sure').click(function() {
	$('.alertBoxLJTwo').hide();
})
//取消提取收益
$('#cancel').click(function() {
	$('.alertBoxLJTwo').hide();
})

//转出本金
$('#alertBoxShow').click(function() {
	$('#extractionIncome').css('background', '#ffffff');
	$('#extractionIncome').css('color', '#ff5959');
	$(this).css('color', '#ffffff');
	$(this).css('background', '#ff5959');

	$('.alertBoxLJ').show();
})

//确定转出本金
$('#TransferFundSure').click(function() {
	$('#KeyboardWrap').hide(200);
	$('#TransferFundBox').animate({
		top: 50 + '%'
	}, function() {
		$('#sureTradeBox').show();
	});

})
//取消转出本金
$('#TransferFundCancel').click(function() {
	$('.alertBoxLJ').hide();
	$('#KeyboardWrap').hide(200);
	$('#TransferFundBox').animate({
		top: 50 + '%'
	})
})

//调取数字键盘
$('#inputAmount').click(function() {
	$('#KeyboardWrap').show(200);
	$('#TransferFundBox').animate({
		top: 40 + '%'
	})
})

//数字键盘逻辑
var xFunction;
var input = function(price) { // 数字初始化
	var num = $("#inputAmount").val() + price;
	$("#inputAmount").val(num);
	$.checkLimit($("#inputAmount"), $("#inputAmount").attr("minNumber"), true);
}
var inputNumber = function(price) { //显示输入数字
	if(price == "reture") {
		var num = $("#inputAmount").val();
		num = num.substring(0, num.length - 1);
		$("#inputAmount").val(num);
		$.checkLimit($("#inputAmount"), $("#inputAmount").attr("minNumber"), false); // 这里传false，是因为当为0.00 时可以删除了，如果为false就不能删除了
	}
	if(price == ".") {
		input(price)
	}
	if(price >= 0 && price <= 9) {
		input(price)
	}
}
$(document).ready(function() {
	$("#numberKeyboard li").click(function() {
		inputNumber($(this).attr("keyboard"));
	});
});

//自定义键盘   点击键盘确认键
$("#keyboardConfirm").click(function() {
	$(".wrap").removeClass("height100P");
	$("#momeyBox").stop().slideUp(200);
	$('#goPay').css("margin-bottom", "0px");
	$('#KeyboardWrap').hide();
	$('#TransferFundBox').animate({
		top: 50 + '%'
	})
});
//去除active
$("#numberKeyboard").on("click", "li", function() {
	var confirm = $(this).attr("keyboard");
	if(!(confirm == "confirm")) {
		$("#shortcut li").removeClass("active");
	}
})