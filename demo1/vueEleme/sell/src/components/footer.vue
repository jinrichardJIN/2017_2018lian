<template>
	<div class="footer">
		<div class="floatL">
			<ul class="footer-left">
				<li @click = 'goInitial()'>点击我执行滚动</li>
				<li>better-scroll</li>
				<li>3</li>
				<li>4</li>
				<li>5</li>
				<li>6</li>
				<li>7</li>
				<li>8</li>
				<li>9</li>
				<li>10</li>
			</ul>
		</div>
		
		<div class="float-R">
			<ul class="footer-right">
			<li>系统滚动</li>
			<li>overflow-scroll</li>
			<li>3</li>
			<li>4</li>
			<li>5</li>
			<li>6</li>
			<li>7</li>
			<li>8</li>
			<li>9</li>
			<li>10</li>
			</ul>
		</div>
	</div>
</template>

<script>
	//引入better-scroll
	import BScroll from 'better-scroll'; 
	
	export default {
		methods:{
			goInitial:function(){
				console.log(BScroll)
				var app = document.querySelector('.floatL');
				this.betterScroll = new BScroll(app,{});
			}
		}
	}
	
</script>

<style>
	.footer{
		height:400px;
		background:salmon;
		overflow:hidden;
	}
	.floatL{
		float: left;
		width:50%;
		background:seagreen;	
		height:100%;
	}
	.footer-left{
		
		
	}
	.footer-left>li{
		height:60px;
		line-height:60px;
		color:white;
		text-align:center;
	}
	.footer-right{
		background:saddlebrown;
	}
	.footer-right>li{
		height:60px;
		line-height:60px;
		color:white;
		text-align:center;
	}
	.float-R{
		height:100%;
		overflow:scroll;
		float:right;
		width:50%;
	}
	
</style> 
