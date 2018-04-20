<template>
	<div id="partner" class="PB60">

		<ul class="partnerLogo">
			<!--<li><img src="../../assets/img/bejingBank.gif" width='100%' height="100%"></li>-->
			<li><img src="~assets/img/partner1.jpg" width='100%' height="100%"></li>
			<li><img src="~assets/img/partner3.jpg" width='100%' height="100%"></li>
			<li><img src="~assets/img/partner4.jpg" width='100%' height="100%"></li>
			<li><img src="~assets/img/partner5.jpg" width='100%' height="100%"></li>
			<li><img src="~assets/img/partner6.jpg" width='100%' height="100%"></li>
		</ul>
	</div>
</template>

<script>
	import titleM  from '../publicComponents/title/title.vue';
	console.log(titleM)
	export default {
		data(){
			return{

			}
		},
		components:{
			titleM,
		}

	}
</script>

<style lang="scss" rel="stylesheet/scss">
	#partner{
		.partnerLogo {
			overflow: hidden;
			padding:0 5%;
			justify-content:space-around;
			padding-top:100px;
			li {
				float: left;
				width:10%;
				margin-left:12%;
				&:nth-child(1){
					margin-left:0;
				}
				img{
					width:100%;
				}
			}
		}
		.afterBlue{
			&:after{
		    display: block;
		    content: '';
		    position: relative;
		    width: 50px;
		    height: 5px;
		    background: #325fec;
		    left: 50%;
		    -webkit-transform: translateX(-50%);
		    transform: translateX(-50%);
		    bottom: -30px;
			}
		}
	}


	@media only screen and (max-width:798px ) {
		.PB85{
			padding-bottom:0
		}
		#partner{
			.partnerLogo{
				overflow: hidden;
				padding-top:50px;
				flex-wrap:wrap;
				li {
					float: left;
					width:30%;
					margin-top:20px;
					margin-left:5%;
					&:nth-child(1){
						margin-left:0;
					}
					&:nth-child(4){
						margin-left:0;
					}
					img{
						display:inline-block;
						width:80%;
						height:25px;
					}
				}
			}
			.afterBlue{
				font-size:14px;
			}

		}


	}


</style>
