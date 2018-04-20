<template>
	<div class="backgroundF7F7f6">
		<div class="myAccount">
			<div class="accountItem">
				<img v-bind:src="avadarSrc" class="avadar">
				<ul class="MT40">
					<li>
						<router-link :to="{name: 'investAccount'}" active-class='boxShadow'>投资账户</router-link>
					</li>
					<li>
						<router-link :to="{name:'investRecord'}" active-class='boxShadow'>交易记录</router-link>
					</li>
				</ul>
			</div>
			<div class="content">
				<router-view></router-view>
			</div>
		</div>
	</div>

</template>

<script>
	import { clientRequest } from 'api/ddjrClientApi';
	import { getRealPath, PD, ajaxRequest } from 'assets/js/merge.js';
	import imgUrl from './img/picture.png';
	export default {
		data() {
			return {
				token: JSON.parse(this.getCookie('userCookie')).token,
				avadarSrc: '',
				url: getRealPath(),
			}
		},
		mounted() {
			if(!this.token) {
				this.$router.push('index');
				return;
			} else {
				//初始化用户信息
				var opt = {
					'functionId': 'myAccount',
					'data': JSON.stringify({})
				}
        clientRequest(opt, this.token).then(res => {
          if(res.resCode == '0000') {
            if(res.resCode == '0000') {
              _this.avadarSrc =  res.record.imageIconOriginal || imgUrl;
            }

          } else {
            this.errText = res.resMsg;
          }
        });
			}

			this.$store.commit('ISCENTER', true); // 进入到 个人中心   提交状态  添加header的class名
			var _this = this;
			this.$router.beforeEach(function(to, from, next) { //  判断是否离开 个人中心 来改变 ISCENTER状态
				to.meta.center === 'center' ? '' : _this.$store.commit('ISCENTER', false);
				next();
			})
		},
		methods: {
			//获取cookie
			getCookie: function(name) {
				var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
				if(arr != null) {
					return unescape(arr[2]);
				} else {
					return null;
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	a {
		color: black;
		width: 100%;
		display: inline-block;
	}
	/*主题背景色*/

	.backgroundF7F7f6 {
		background: #f7f7f8;
	}

	.myAccount {
		width: 1200px;
		margin: 0 auto;
		margin-top: 140px;
		overflow: hidden;
		.accountItem {
			width: 150px;
			padding-top: 60px;
			background: #FFFFFF;
			float: left;
			li {
				height: 125px;
				line-height: 125px;
			}
		}
		.content {
			float: left;
			margin-left: 20px;
			width: 1030px;
		}
	}

	.boxShadow {
		box-shadow: 0px 0px 10px gainsboro;
		width: 100%;
		margin: 0 auto;
		height: 100%;
		display: inline-block;
		color: #4287F2;
	}

	.avadar {
		width: 80px;
		height: 80px;
		border-radius: 50px;
	}
</style>
