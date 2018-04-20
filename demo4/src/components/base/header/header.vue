<template>
		<header class="min-header clearfix borderB">
			<span class="fl inlineB height100P" @click="goBack()">
					<img src="~assets/img/leftArrow.png" width="10" class="positionR leftArrow back" >
				</span>			
				<span class="font16 height100P leftArrow positionR">{{title}}</span>
		</header>	
</template>

<script>
	export default {
		created() {
		},
		props:{
			title: {
	        type: String,
	        default: ''
	      }
		},
		data() {
			return {

			}
		},
		components: {
		},
		filters: {
		  },
		methods: {
			goBack(){
				this.$router.go(-1);
			}
		}
	}
</script>

<style scoped>
.min-header{
    box-sizing: border-box;
    color: #333;
    font-size: 14px;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
}
.leftArrow {
top: 13px;
}
.borderB{
	border-bottom: 1px solid #eee;	
}
.clearfix{
	display: flex
}			
</style>