<template>
	<footer class="footer" style="display: block;">
		<router-link :to="{name: 'home'}" class="fl width20 textC footer-home">
			<!--   <img src="./ico1.png" width="30" class="" v-show="active != 'index'">
          <img src="./ico1_ac.png" width="30" class="" v-show="active === 'index'">-->
			<span class="footer-home-img"></span>
			<span>首页</span>
			<!--   <div class="MT_4" style="">首页</div>-->
		</router-link>
		<router-link :to="{name: 'goodsList'}" class="fl width20 textC footer-goodsList">
			<span class="footer-goodsList-img"></span>
			<span>机型大全</span>
			<!--<img src="./ico2.png" width="30" class="" v-show="active != 'goodsList'">
          <img src="./ico2_ac.png" width="30" class="" v-show="active === 'goodsList'">
          <div class="MT_4">机型大全</div>-->
		</router-link>
		<router-link :to="{name: 'release'}" class="fl width20 textC footer-release">
			<img src="./issue.png" width="50" class="issue">
          	<div class="MT_4">发布</div>
			<!--<span class="footer-release-img"></span>
			<span>发布</span>-->
		</router-link>
		<router-link :to="{name: 'message'}" class="fl width20 textC footer-message">
			<!-- <img src="./ico3.png" width="30" class="" v-show="active != 'message'">
          <img src="./ico3_ac.png" width="30" class="" v-show="active === 'message'">
          <div class="MT_4">消息</div>-->
			<span class="footer-message-img"></span>
			<span>消息</span>
		</router-link>
		<router-link :to="{name: 'user'}" class="fl width20 textC footer-user">
			<!--<img src="./ico4.png" width="30" class="" v-show="active != 'user'">
          <img src="./ico4_ac.png" width="30" class="" v-show="active === 'user'">
          <div class="MT_4">个人中心</div>-->
			<span class="footer-user-img"></span>
			<span>个人中心</span>
		</router-link>
	</footer>
</template>

<script>
	export default {
		data() {
			return {
				active: 'index'
			}
		},
		methods: {
			change(name) {
				this.active = name;
			},
		},
		mounted() {

		}
	};
</script>

<style scoped type="text/css" lang="scss">
	.footer {
		position: fixed;
		bottom: 0;
		height: 49px;
		box-shadow: 0 -5px 0 rgba(234, 234, 234, 0.5);
		width: 100%;
		font-family: '.PingFangSC-Regular';
		font-size: 10px;
		color: #626262;
		letter-spacing: 0;
		display: flex;
		justify-content:center;
		align-items:center;
		background: #FFFFFF;
		z-index: 100;
		a {
			display: flex;
			justify-content:center;
			align-items:center;
			flex-direction:column;
			font-size: 10px;
			color: #626262;
			span:first-child {
				width: 100%;
				height: 26px;
				display: block;
				background-repeat: no-repeat;
				margin-top: 6px;
				background-size: 26px;
				background-position: center;
			}
		}
		.footer-home {
			.footer-home-img {
				background-image: url(./ico1.png);
			}
			&.router-link-active>.footer-home-img {
				background-image: url(./ico1_ac.png);
			}
		}
		.footer-goodsList {
			.footer-goodsList-img {
				background-image: url(./ico2.png);
				
			}
			&.router-link-active>.footer-goodsList-img {
				background-image: url(./ico2_ac.png);
			}
		}
		.footer-message {
			.footer-message-img {
				background-image: url(./ico3.png);
			}
			&.router-link-active>.footer-message-img {
				background-image: url(./ico3_ac.png);
			}
		}
		.footer-user {
			.footer-user-img {
				background-image: url(./ico4.png);
			}
			&.router-link-active>.footer-user-img {
				background-image: url(./ico4_ac.png);
			}
		}
	}
	
	.issue {
		margin-top: -19px
	}
	
	.MT_4 {
		margin-top: 1px;
	}
</style>
<style>
	/*	.footer {
    width: 100%;
    @include flexbox();
    @include justify-content(center);
    @include align-items(center);
    height: .44rem;
    background: #FFFFFF;
    box-shadow: 0 -0.05rem .04rem 0 rgba(234,234,234,0.50);
    padding-top: .04rem;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 100;
    a{
        @include flexbox();
        @include flex-direction(column);
        @include justify-content(center);
        @include align-items(center);
        width: calc(100%/3);
        font-size: .1rem;
        color: #626262;
        span:first-child{
            width: 100%;
            height: .2rem;
            display: block;
            background-repeat:  no-repeat;
            background-size: .25rem;
            background-position: center;
        }
        .footer-font{
            height: .15rem;
        }
    }
    .footer-index{
        .footer-index-img{
            background-image: url(../image/ico1.png);
        }
        &.router-link-active>.footer-index-img{
            background-image: url(../image/ico1_ac.png);
        }
    }  
    .footer-moball{
        .footer-moball-img{
            background-image: url(../image/ico2.png);
        }
        &.router-link-active>.footer-moball-img{
            background-image: url(../image/ico2_ac.png);
        }
    }  
    .footer-mine{
        .footer-mine-img{
            background-image: url(../image/ico3.png);
        }
        &.router-link-active>.footer-mine-img{
            background-image: url(../image/ico3_ac.png);
        }
    }  
}*/
</style>