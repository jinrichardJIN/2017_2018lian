<template>
	<div>
		<div>
			<transition>
				<keep-alive>
					<router-view></router-view>
				</keep-alive>
			</transition>
			<v-footer></v-footer>
		</div>
	</div>
</template>

<script>
	import Footer from 'base/footer/footer.vue';
	export default {
		name: 'app',
		components: {
			'v-footer': Footer
		}
	}
</script>

<style scoped>
	body{
		margin-bottom: 50px
	}
</style>