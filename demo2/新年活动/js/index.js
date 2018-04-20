var vm = new Vue({
	el:'#vue',
	data: {
		activityRule:false,		//活动规则
		activityExchangeRecord:false,	//兑换记录
		activityDrawnRecord:false,		//中奖记录
		drawReward:false,				//抽仟记录
		drawTip:false,					//抽奖提示
		activityOn:true				//活动时间
	},
	created:function(){
		var img =  new Image();
			img.src = 'img/banner.png';
			img.onload = function(){
				console.log('加载成功');
				$('.banner').attr('src','img/banner.png');
			}
		
	},
	
	methods: {
		//点击活动规则
		CactivityRule: function() {

		},
		//点击兑换记录
		CactivityExchangeRecord: function() {

		},
		//点击中奖记录
		CactivityDrawnRecord: function() {

		},
		//点击抽签拿奖
		CgoDraw: function() {
			vm.drawTip = false;
			$('#drawImg').attr('src','img/yaoqian.gif');
			setTimeout(function(){
				$('#drawImg').attr('src','img/qian.png');
			},2000)
		},
		//立即领取
		CrightNowRecevie: function() {

		},
		//立即兑换
		CrightNowExchange: function() {

		},
		//分享好友
		Cshare: function() {

		}
	}
})