<template>
	<div>
		<div class="assess-box">
		<header class="roder-top">
			<router-link :to="{name: 'index.mine'}">
				<img src="../image/leftArrow.png" alt="" />
			</router-link>
			<h1 class="mui-title">帮助中心</h1>
		</header>
		<div id="help-content">
			<div>
				<h4>进行门店和上门交易，需提前注意什么？</h4>
				<p class="pbm15">1.顾客在交易的时候，需提供中华人民共和国第二代居民身份证（护照和驾驶证等不可使用）</p>
				<p>2.电子产品（手机、笔记本、平板等）在交易前请提前充好电。</p>
			</div>
			<div>
				<h4 class="span1">找不到型号怎么办？</h4>
				<p>尽量减少关键词数量，扩大搜索范围。</p>
			</div>
			<div>
				<h4 class="span1">机器寄出后如何保证我的利益？</h4>
				<p>闲汇是提供平台给商户竞价回收的，闲汇为保障双方交易资金的安全，和用户确认好之后商户会把预付金打到闲汇的账户中，由闲汇来进行交易的资金保护。</p>
			</div>
			<div>
				<h4 class="span1">哪些机器闲汇不进行回收？</h4>
				<p>山寨机、高仿机、扳机、烧卡机（写号机）、改卡机以及网站上没有的品牌都不回收</p>
			</div>
			<div>
				<h4 class="span1">快递费由谁承担，标准是多少？</h4>
				<p>商家提供邮寄的运费补贴，补贴额度根据具体情况而定。在订单产生异议并且用户需回寄机器时，回寄费用由用户自己承担。</p>
			</div>
			<div>
				<h4 class="span1">收不到短信验证码怎么办？</h4>
				<p>短信收发过程中会存在延迟，收到的短信在10分钟内均有效，请耐心等待。每天单一手机号注册验证码最多重复发送5次，超过则需24小时后重试。</p>
			</div>
			<div>
				<h4 class="span1">交易方式有哪些？</h4>
				<p class="pbm15">门店回收：订单提交成功后，根据订单完成页面提供的门店地址前去交易。</p>
				<p class="pbm15">上门回收：订单提交成功后，请耐心等待商家指派的工作人员联系您上门回收。</p>
				<p>快递回收：订单提交成功后，在担保金足额的条件下，请将交易商品按照页面提供的邮寄地址尽快寄出，并在订单中心填入快递单号。</p>
			</div>
			<div id="specialD">
				<h4 class="span1">如何查看路由器型号与硬件版本？</h4>
				<p>产品的型号和硬件版本是唯一定义产品的标识，可以通过以下两种方法查看：</p>
				<p><span>方法一、在壳体标贴纸上查看</span></p>
				<p class="pbm10">在产品壳体背面（或底部、侧边）找到标贴纸的位置。标贴上的 型号（或Model） 即产品型号，序列号（Serial Number或SN码）一栏中，Ver后面的数字就是硬件版本。</p>
				<p class="p1">
					<a>点击查看更多<img src="../image/bottomArrow.jpg" alt="" /></a>
				</p>
				<div id="d8none">
					<p class="comp">以TL-WR841N V12为例，查看方法如下：</p>
					<div class="clearfix">
						<img src="../image/u6708.png" class="fl" />
						<p class="fl">标贴纸上查看型号与硬件版本</p>
					</div>
					<p>部分3G/4G路由器或86盒式AP，标贴纸在壳体内，需要打开后盖（取出电池）才能看到：</p>
					<div class="clearfix">
						<img src="../image/u6710.png" class="fl" />
						<p class="fl">可拆卸壳体的产品</p>
					</div>
					<p>对于部分迷你无线网卡，壳体没有标贴纸，请在USB接口上查看型号和版本，如下图</p>
					<div class="clearfix">
						<img src="../image/u6712.png" class="fl" />
						<p class="fl">迷你型无线网卡</p>
					</div>
					<p>PCI无线网卡的PCB板上贴着标贴纸，也可以查看到型号和版本，如下：</p>
					<div class="clearfix">
						<img src="../image/u6714.png" class="fl" />
						<p class="fl">PCI网卡</p>
					</div>
					<p>温馨提示：如果标贴被污染无法看清楚，请通过说明书或在管理界面（方法二）查看。</p>
					<p class="comp">方法二、在管理界面查看</p>
					<p>如果产品在WEB管理界面，请使用管理地址登录产品管理界面查看。一般在软件升级的地方可以查看到产品型号和硬件版本，如下：</p>
					<div>
						<img src="../image/u6716.jpg" />
					</div>
					<p>版本较老的路由器界面：</p>
					<div>
						<img src="../image/u6718.jpg" />
					</div>
					<p class="p2">
						<a>点击查看更多<img src="../image/topArrow.jpg" alt="" /></a>
					</p>
				</div>
			</div>
			<div>
				<h4 class="span1">如何查找自己的手机型号？ </h4>
				<p class="comp">安卓系统</p>
				<p class="pbm15">前往“设置&gt;关于手机，”然后查看您设备的相关信息。</p>
				<p class="comp">苹果用户</p>
				<p>方法一：苹果手机背面有型号信息。(如图所示)</p>
				<p>方法二：前往“设置&gt;通用&gt;监管，”然后查看您设备的相关信息。</p>
				<div>
					<img src="../image/u6755.png" />
				</div>
			</div>
			<div>
				<h4 class="span1">如何查找自己的笔记本型号？ </h4>
				<p class="comp">苹果笔记本</p>
				<p>方法一：点击左上角的苹果标志，打开菜单栏，其中一个是关于本机，点击，然后点击更多信息。（如图所示）</p>
				<p>方法二：重复上述操作，复制关于本机页中的序列号，在苹果官网https://checkcoverage.apple.com/cn/zh/?sn查询。也可以在笔记本背面看到序列号。</p>
				<img src="../image/u6765.png" />
				<p class="comp">其他品牌笔记本</p>
				<p>外观查询方法</p>
				<p>机身正面型号标识点：键盘下方型号标签，屏幕四角型号标签。</p>
				<p>机身背面型号标识点：背面标签上，前缀为“Model”、“Model(型号)”、“型号”、“Product”、“产品型号”、“品名”等的，一般是型号。(如左图所示)</p>
				<p>系统查询方法</p>
				<p>序列号查询：背面标签上，(如右图所示)前缀为“S/N”、“Serial”、“Serial No”、“Serial Number”、“产品序号”等的，一般是该笔记本序列号，使用该序列号前往品牌官网查询，可得到笔记本型号。</p>
				<img src="../image/u6767.png" />
			</div>
		</div>
	</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		beforeCreate(){
		},
		methods: {
			
		},
		mounted() {
			$('.p1 a').click(function() {
				$(this).css({
					'display': 'none'
				});
				$('#d8none').css({
					'display': 'block'
				});
			});
			$('.p2 a').click(function() {
				$('#d8none').css({
					'display': 'none',
				});
				$('.p1 a').css({
					'display': 'initial'
				});
				window.scrollTo(0, $('#specialD').offset().top - 50);
			})
		}
	}
</script>

<style>

</style>