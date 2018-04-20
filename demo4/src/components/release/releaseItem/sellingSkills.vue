<template>
	<div class="sellingSkillsBox">
		<header>
			<div>
				<router-link :to="{name: 'release'}">
					<img src="../releaseItem/img/leftback.png" alt="" />
				</router-link>
			</div>
			<div class="title">
				<p>卖出技巧</p>
			</div>
			<div>
				
			</div>
		</header>
		<div class="describe">
			<p>1.标题清晰明确，尽量12字以内；</p>
			<p>2.尽可能描述详尽，如到手时间，目前情况等；</p>
			<p>3.准确填写类目，品牌；</p>
			<p>4.实名认证后，可增加曝光度，可增强信任感；</p>
		</div>
		<div class="imgDivBox">
			<p>1.商品照片要清晰</p>
			<div>
				
				<div class="photoBox">
					<img src="../releaseItem/img/1-1.png" alt="" />
				</div>
				<div id="correct">
					<img src="../releaseItem/img/correct.png" alt="" />
				</div>
				<div id="error">
					<img src="../releaseItem/img/error.png" alt="" />
				</div>
				<div class="photoBox">
					<img src="../releaseItem/img/1-2.png" alt="" />
				</div>
			</div>
		</div>
		<div class="imgDivBox">
			<p>2.多角度拍摄、更丰富的细节</p>
			<div>
				<div class="photoBox">
					<img src="../releaseItem/img/2-1.png" alt="" />
				</div>
				<div class="photoBox">
					<img src="../releaseItem/img/2-2.png" alt="" />
				</div>
				<div class="photoBox">
					<img src="../releaseItem/img/2-3.png" alt="" />
				</div>
			</div>
		</div>
		<div class="imgDivBox">
			<p>3.真人、使用场景实拍更有吸引力</p>
			<div>
				<div class="photoBox">
					<img src="../releaseItem/img/2-4.png" alt="" />
				</div>
				<div class="photoBox">
					<img src="../releaseItem/img/2-5.png" alt="" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
</script>

<style scoped type="text/css" lang="scss">
	.sellingSkillsBox{
		position: fixed;
	    overflow-y: scroll;
	    top: 0px;
	    left: 0px;
	    background: #FFF;
	    z-index: 1000;
	    width: 100%;
	    height: 100%;
	}
	header{
		height: 45px;
		display: flex;
		align-items: center;
		justify-content: space-around;
		border-bottom:1px solid #EDEDED;
		div{
			width: calc(100%/3);
			&:first-child{
				text-align: left;
				img{
					height: 14px;
				}
			}
			&:last-child{
				padding-right: 20px;
			}
			&:nth-child(2){
				p{
					text-align: center;
					font-size: 15px;
					color: #333333;
				}
			}
		}
	}
	.describe{
		margin-top: 45px;
		padding: 23px 0 10px 20px;
		p{
			font-family: '.PingFangSC-Regular';
			font-size: 14px;
			color: #333333;
			line-height: 23px;
			letter-spacing: 0;
		}
	}
	.imgDivBox{
		padding-left: 20px;
		margin-top: 20px;
		position: relative;
		p{
			font-family: '.PingFangSC-Regular';
			letter-spacing: 0;
			font-size: 14px;
			color: #333333;
			line-height: 23px;
			display: block;
			margin-bottom: 11px;
		}
		div{
			display: flex;
			.photoBox{
				float: left;
				margin-left: 10px;
				&:first-child{
					margin-left: 0px;
				}
				img{
					width: 80px;
					height: 80px;
				}
			}
		}
		#correct,#error{
			position: absolute;
			img{
				width: 18px;
				height: 18px;
			}
			
		}
		#correct{
			left: 88px;
    		top: 26px;
		}
		#error{
			right: 176px;
			top: 26px;
		}
	}
	
</style>