<template>
    <div id="app">
    	<v-header></v-header>
	    <v-middle></v-middle>
	    <v-footer></v-footer>
    </div>
</template>

<script type="text/javascript">
  	import Footer from './components/footer';
  	import Header from './components/header';
  	import Middle from './components/middle';
  	
 
	export default {
	  	components:{
     		'v-header':Header,
     		'v-footer':Footer,
     		'v-middle':Middle
   		}  
	}
	
</script>

<style>

</style> 
